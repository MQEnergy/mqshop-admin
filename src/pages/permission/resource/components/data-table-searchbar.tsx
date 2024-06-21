import DataTableSearchBar from "@/components/custom/data-table/data-table-searchbar.tsx";
import {SearchInput} from "@/components/custom/search-input.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import {useImmer} from "use-immer";
import {useContext} from "react";
import {TableContext} from "@/context.tsx";
import {ResourceItem} from "@/pages/permission/resource/data/schema.ts";

export interface SearchInfo {
  keyword: string;
  status: string;
}

interface DataTableSearchbarProps {
  info: ResourceItem | null
  loading?: boolean
  onSearch: (values: SearchInfo) => void
}

export function DataTableSearchbar({...props}: DataTableSearchbarProps) {
  const {trans} = useContext(TableContext)
  const [searchInfo, setSearchInfo] = useImmer<SearchInfo>({
    keyword: '',
    status: ''
  })
  const handleSearch = () => {
    props.onSearch(searchInfo)
  }
  const handleReset = () => {
    setSearchInfo(draft => {
      draft.keyword = ''
      draft.status = ''
      props.onSearch(draft)
    })
  }
  return (
    <DataTableSearchBar className={'border-none shadow'} loading={props.loading} onSubmit={handleSearch}
                        onReset={handleReset}>
      <SearchInput type={'search'}
                   className={'md:w-full lg:w-full'}
                   placeholder={trans?.t('settings.search.placeholder')}
                   value={searchInfo.keyword}
                   onKeyword={(val) => setSearchInfo(draft => {
                     draft.keyword = val
                   })}/>
      <Select value={searchInfo.status}
              onValueChange={(val) => setSearchInfo(draft => {
                draft.status = val
              })}>
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
    </DataTableSearchBar>
  )
}