"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function SearchTodo({ searchTodo }: { searchTodo: Function }) {
  const [searchValue, setSearchValue] = useState("");
  const onChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    console.log(value);
    setSearchValue(value);
  };

  return (
    <div className="flex">
      <Input
        type="text"
        onChange={onChanged}
        value={searchValue}
        placeholder="Search todo"
      />
      <Button variant={"ghost"} onClick={() => searchTodo(searchValue)}>
        <Search />
      </Button>
    </div>
  );
}
