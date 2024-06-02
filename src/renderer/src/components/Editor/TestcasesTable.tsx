import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { CheckCircledIcon, CrossCircledIcon, UpdateIcon } from '@radix-ui/react-icons'
import type { TestcaseMessage } from 'src/shared/types/code'

type Props = {
  testcaseMessages: Array<TestcaseMessage>
}

const TestcasesTable: React.FC<Props> = ({ testcaseMessages }) => {
  return (
    <Table>
      <TableCaption>Your hidden testcases goes here.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Testcases</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="text-right">Timing</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testcaseMessages.map((testcase) => (
          <TableRow key={testcase.id}>
            <TableCell className="font-medium flex items-center">
              {testcase.status === 'success' && (
                <CheckCircledIcon className="text-green-500 mr-2" />
              )}
              {testcase.status === 'failed' && <CrossCircledIcon className="text-red-500 mr-2" />}
              {testcase.status === 'pending' && (
                <UpdateIcon className="text-yellow-400 mr-2 animate-spin" />
              )}
              Testcase #{testcase.id}
            </TableCell>
            <TableCell>{testcase.status}</TableCell>
            <TableCell title={testcase.message}>{testcase.message}</TableCell>
            <TableCell className="text-right">{testcase.timing}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TestcasesTable
