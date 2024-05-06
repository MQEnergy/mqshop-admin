"use client"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Languages} from "lucide-react";
import {useTranslation} from "react-i18next";
import {useStorage} from "@/hooks/use-local-storage";

export default function Language() {
  const [lang, setLang] = useStorage({
    key: "mqshop-lng",
    defaultValue: 'en-US'
  });
  const {i18n} = useTranslation();

  const changeLanguage = (lng) => {
    setLang(lng);
    i18n.changeLanguage(lng).then((t) => {
      t('menu.welcome');
    });
  };

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
              size='icon'
              variant='ghost'
              className='relative h-8 w-8 rounded-full'
          >
            <Languages size={20}/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuRadioGroup value={lang} onValueChange={changeLanguage}>
            <DropdownMenuRadioItem value="zh-CN">中文</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en-US">English</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
