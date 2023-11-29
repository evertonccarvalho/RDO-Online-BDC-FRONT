"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkParams, workService } from "@/services/workService";
import { useEffect, useState } from "react";

export default function WorkSelectList({
  control,
  name,
  label,
  placeholder,
  type,
  ...rest
}: any) {
  const [availableWorks, setAvailableWorks] = useState<Record<number, string>>(
    {},
  );

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await workService.fetchAll();
        const worksMap: Record<number, string> = {};
        data.forEach((obra: WorkParams) => {
          worksMap[obra.id] = obra.workDescription;
        });
        setAvailableWorks(worksMap);
      } catch (error) {
        console.error("Erro ao buscar obras:", error);
      }
    };

    fetchWorks();
  }, []);

  const workLists = Object.entries(availableWorks).map(([id, description]) => (
    <SelectItem key={id} value={id}>
      {`${id} ${description}`}
    </SelectItem>
  ));

  return (
    <FormField
      control={control}
      name="workId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex gap-2 text-sm">Obra</FormLabel>
          <Select
            name="workId"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={`ID: ${field.value}: ${
                    availableWorks[field.value] || "Selecione uma obra"
                  }`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{workLists}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
