import 'github-markdown-css/github-markdown.css'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { useAppSelector } from '@/app/hooks'
import TestcaseOutput from './TestcaseOutput'

const Markdown: React.FC = () => {
  const question = useAppSelector((state) => state.editor.question)

  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto p-6 prose prose-code:before:content-none prose-code:after:content-none prose-headings:text-inherit prose-code:text-inherit prose-strong:text-inherit max-w-full markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {'## Problem Statement\n' +
            question.question +
            '\n\n' +
            '### Input Format\n' +
            question.input_format +
            '\n\n' +
            '### Output Format\n' +
            question.output_format +
            '\n\n'}
        </ReactMarkdown>

        <div>
          <h3>Sample Testcases</h3>
          {question.sample_io.map((sample, i) => (
            <TestcaseOutput key={i} input={sample.input} output={sample.output} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Markdown
