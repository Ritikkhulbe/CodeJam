import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SupportedLanguages } from 'src/shared/types/code'

type Props = {
  language: SupportedLanguages
  onLanguageChange: (language: SupportedLanguages) => void
}

const LanguageSelect: React.FC<Props> = ({ language, onLanguageChange }) => {
  // Save the selected language to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <Select value={language} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="cpp">C++</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="javascript">Javascript</SelectItem>
          <SelectItem value="typescript">Typescript</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect
