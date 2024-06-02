import * as React from 'react'

import { CheckedState } from '@radix-ui/react-checkbox'
import { ReloadIcon, RocketIcon } from '@radix-ui/react-icons'

import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setOutput, setTestcases } from '@/features/editor/editorSlice'

import TestcaseOutput from './TestcaseOutput'
import TestcasesTable from './TestcasesTable'

import type { TestcaseMessage } from 'src/shared/types/code'
import { useEditor } from '@/context/EditorContext'
import { useSocket } from '@/context/SocketContext'
import { validateTestcase } from '@/lib/execute-code'
// import { useNavigate } from 'react-router-dom'

const Testcase: React.FC = () => {
  const { mode, setEditorOptions } = useEditor()
  const { socket } = useSocket()
  // const navigator = useNavigate()

  const [testcase, setTestcase] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [testcaseMessages, setTestcaseMessages] = React.useState<TestcaseMessage[]>([])

  const output = useAppSelector((state) => state.editor.output)
  const code = useAppSelector((state) => state.editor.code)
  const question = useAppSelector((state) => state.editor.question)

  const dispatch = useAppDispatch()

  async function submitCode(): Promise<void> {
    dispatch(setOutput([]))
    setEditorOptions({ mode: 'hidden' })
    setIsLoading(true)

    setTestcaseMessages(
      question.testcases.map((_item, index) => ({
        id: index + 1,
        status: 'pending',
        timing: '--',
        message: 'Running...'
      }))
    )

    let score = 0

    window.api
      .execute({
        code: code,
        testcases: question.testcases.map((testcase) => testcase.input),
        language: localStorage.language
      })
      .then((data) => {
        console.log(question.testcases)
        setTestcaseMessages(
          data.map((item, index) => {
            const isValid = validateTestcase(item.output, question.testcases[index].output)
            if (isValid) score += question.testcases[index].score
            const res: TestcaseMessage = {
              id: index + 1,
              status: isValid ? 'success' : 'failed',
              timing: item.timing + 'ms',
              message: isValid ? 'Testcase Passed' : 'Testcase Failed'
            }
            console.log(score)
            return res
          })
        )
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
        if (socket?.connected && score === 100) {
          socket?.emit('submit', { score })
          // navigator('/results')
        }
      })
  }

  React.useEffect(() => {
    if (mode === 'custom') {
      dispatch(setTestcases([testcase]))
    } else if (mode === 'sample') {
      dispatch(setTestcases(question.sample_io.map((testcase) => testcase.input)))
    }
  }, [mode])

  // Problem: Sample -> Custom -> Hidden -> Sample results in custom testcases not being updated
  const handleCheckboxChange = (event: CheckedState): void => {
    setEditorOptions({ mode: event ? 'custom' : 'sample' })
  }

  return (
    <div className="p-4 pt-6 overflow-y-auto h-full">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="custom-testcase"
            checked={mode === 'custom'}
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="custom-testcase"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Custom Testcase
          </label>
        </div>

        <Button size="sm" variant="secondary" onClick={submitCode} disabled={isLoading}>
          {isLoading ? (
            <ReloadIcon className="animate-spin mr-1" />
          ) : (
            <RocketIcon className="me-1" />
          )}
          Submit Test
        </Button>
      </div>

      {mode === 'custom' && (
        <Textarea
          value={testcase}
          onChange={(e) => setTestcase(e.target.value)}
          onBlur={() => dispatch(setTestcases([testcase]))}
          className="mt-3 font-mono"
          placeholder="Enter your custom testcase here"
        ></Textarea>
      )}

      <div className="markdown-body">
        <div>
          <h4>Compiler Message</h4>
          <pre>
            <code>Compiling...</code>
          </pre>
        </div>

        {output.length > 0 && mode !== 'hidden' && (
          <div>
            <h4>Testcases</h4>
            {output.map((testcase, i) => (
              <TestcaseOutput key={i} input={testcase.sample} output={testcase.result} />
            ))}
          </div>
        )}
      </div>

      {mode === 'hidden' && <TestcasesTable testcaseMessages={testcaseMessages} />}
    </div>
  )
}

export default Testcase
