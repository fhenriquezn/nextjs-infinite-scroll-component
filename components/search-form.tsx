"use client";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Form from "next/form";

interface SearchFormProps {
  q?: string;
}

function SearchForm(props: SearchFormProps) {
  return (
    <Form action="/" className="relative max-w-md w-full flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          name="q"
          placeholder="Search products..."
          className="pl-10 w-full"
          defaultValue={props.q}
        />
      </div>
      <Button size="icon" type="submit">
        <Search className="h-4 w-4" />
      </Button>
    </Form>
  );
}

export default SearchForm;
