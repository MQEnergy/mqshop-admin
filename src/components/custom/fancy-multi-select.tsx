import * as React from "react";
import {Check, X} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem, CommandList,
} from "@/components/ui/command";
import {Command as CommandPrimitive} from "cmdk";
import {cn} from "@/lib/utils";

export type selectItem = Record<"value" | "label", string>;

export interface MultiSelectProps {
  list: selectItem[];
  selected: selectItem[];
  onSelect: (items: selectItem[]) => void;
}

export function FancyMultiSelect(props: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          const newSelected = [...props.selected]
          newSelected.pop()
          props.onSelect(newSelected)
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, [props.onSelect]);

  const selectValues = props.selected.map(item => item.value)

  const handleSelect = (item: selectItem) => {
    setInputValue("")
    if (selectValues.indexOf(item.value) >= 0) {
      const selectedFilter = props.selected.filter(fr => !(fr.value === item.value));
      props.onSelect([...selectedFilter])
    } else {
      props.onSelect([...props.selected, item])
    }
  }

  return (
    <Command onKeyDown={handleKeyDown} className="h-auto overflow-visible bg-background">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {props.selected.map((item) => {
            return (
              <Badge key={'selected-' + item.value} variant="secondary">
                {item.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSelect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleSelect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground"/>
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="请选择..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className={`relative ${open ? "mt-2" : ''}`}>
        {open ?
          <div
            className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandGroup className="h-full overflow-auto">
                {props.list.map((item) => {
                  return (
                    <CommandItem
                      key={'command-item-' + item.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => handleSelect(item)}
                      className={"cursor-pointer"}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectValues.indexOf(item.value) >= 0 ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>

          </div>
          : null}
      </div>
    </Command>
  )
}