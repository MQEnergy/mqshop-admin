import DataTableSearchBar from "@/components/custom/data-table/data-table-searchbar.tsx";
import {SearchInput} from "@/components/custom/search.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";

interface DataTableSearchbarProps {
  info: null
  onSearch: (values: any) => void
}

export function DataTableSearchbar({...props}: DataTableSearchbarProps) {
  const {t} = useTranslation();
  const [searchInfo, setSearchInfo] = useState({
    keyword: '',
    status: '',
    role_id: '',
  })
  const handleSearch = () => {
    props.onSearch(searchInfo)
  }
  const handleReset = () => {
    setSearchInfo({
      keyword: '',
      status: '',
      role_id: '',
    })
  }
  return (
    <DataTableSearchBar className={'border-none shadow'} onClick={handleSearch} onReset={handleReset}>
      <SearchInput placeholder={t('settings.search.placeholder')} className={'md:w-full lg:w-full'}
                   type={'search'} value={searchInfo.keyword}/>
      <Select>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="请选择状态"/>
        </SelectTrigger>
        <SelectContent className='max-h-[200px]'>
          <SelectGroup>
            <SelectLabel>状态</SelectLabel>
            <SelectItem value="1">正常</SelectItem>
            <SelectItem value="2">禁用</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="请选择角色"/>
        </SelectTrigger>
        <SelectContent className='max-h-[200px]'>
          <SelectGroup>
            <SelectLabel>角色</SelectLabel>
            <SelectItem value="1">角色</SelectItem>
            <SelectItem value="2">禁用</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </DataTableSearchBar>
  )
}