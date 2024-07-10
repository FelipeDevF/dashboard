"use client";

import { useEffect, useState } from "react";
import { useGetDataSources } from "@/hooks/use-get-data-sources";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart, 
  Bar,
  Rectangle,
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  agroup,
  calculateTotal,
  findMoneyKeys,
  formatKeyName,
  formatToBRL
} from "@/lib/utils";

export default function Home() {  
  const [sum, setSum] = useState('');
  const [keys, setKeys] = useState('');
  const [presentationType, setPresentationType] = useState('table');
  const [dataSource, setDataSource] = useState('');

  const data = useGetDataSources(dataSource)

  const handleDataSource = (value: string) => {
    setDataSource(value)
    setSum('')
    setKeys('')
  }  
  
  const moneyKeys = !data.isLoading && data.isSuccess
  ? findMoneyKeys(data.data)
  : [];
  
  const { departments = [], totalDepartments = {}} = !data.isLoading && data.isSuccess
  ? agroup(data.data, sum, keys, moneyKeys)
  : agroup([], sum, keys, moneyKeys)
  
  const total = !data.isLoading && data.isSuccess
  ? calculateTotal(data.data, moneyKeys)
  : 0;

  const formatChartData = (totalDepartments) => {
    return Object.keys(totalDepartments).map(key => ({
      department: key,
      total: totalDepartments[key]
    }));
  };

  const chartData = formatChartData(totalDepartments);    

	useEffect(() => {
		if (data.isSuccess && keys) {
			agroup(data.data, sum, keys, moneyKeys);
		}	
	}, [data, keys])

  useEffect(() => {
    if(dataSource) data.refetch()
  }, [dataSource])

  return (
    <main className="flex flex-col gap-4">
      <div className="flex-1">
        <Select onValueChange={handleDataSource}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma fonte da dados" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            <SelectItem key={"dados-1"} value={"1"}>
              Fonte de dados 1
            </SelectItem>
            <SelectItem key={"dados-2"} value={"2"}>
              Fonte de dados 2
            </SelectItem>
            <SelectItem key={"dados-3"} value={"3"}>
              Fonte de dados 3
            </SelectItem>
            <SelectItem key={"dados-4"} value={"4"}>
              Fonte de dados 4
            </SelectItem>
            <SelectItem key={"dados-5"} value={"5"}>
              Fonte de dados 5
            </SelectItem>
          </SelectContent>
        </Select>
      </div>   
      <RadioGroup className="flex" onValueChange={setPresentationType} value={presentationType}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="table" id="table" />
          <label className="cursor-pointer" htmlFor="table">Tabela</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="graphic" id="graphic" />
          <label className="cursor-pointer" htmlFor="graphic">Gráfico</label>
        </div>
      </RadioGroup> 
      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="flex-1">
          <Select onValueChange={setSum} disabled={!dataSource}>
            <SelectTrigger>
              <SelectValue placeholder={data.isLoading ? "Carregando..." : "Somar / Totalizar"} />
            </SelectTrigger>
            <SelectContent className="capitalize">
              {!data.isLoading && data.isSuccess && (
                <>
                {moneyKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {formatKeyName(key)}
                  </SelectItem>
                ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>              

        <div className="flex-1">
          <Select onValueChange={setKeys} disabled={!dataSource}>
            <SelectTrigger className="">
              <SelectValue placeholder={data.isLoading ? "Carregando..." : "Vizualizar por"} />
            </SelectTrigger>
            <SelectContent className="capitalize">
              {!data.isLoading && data.isSuccess && (
                <>
                {Object.keys(data.data[0]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {formatKeyName(key)}
                  </SelectItem>
                ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>    

        <div className="flex-1">
          <Select disabled={!dataSource}>
            <SelectTrigger>
              <SelectValue placeholder={data.isLoading ? "Carregando..." : "Detalhar por"} />
            </SelectTrigger>
            <SelectContent className="capitalize">
              {!data.isLoading && data.isSuccess && (
                <>
                {Object.keys(data.data[0]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {formatKeyName(key)}
                  </SelectItem>
                ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>  
      </div>
      
      {sum && keys && (
        <>
        {presentationType === 'table'  && (
          <Table className="bg-gray-300 rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead colSpan={3}>{formatKeyName(keys)}</TableHead>
                <TableHead className="text-right">{sum}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map(d => (
								<TableRow key={d}>
									<TableCell colSpan={3}>{d}</TableCell>
									<TableCell className="text-right">
											{totalDepartments[d] ? totalDepartments[d].toFixed(2) : 0}
										</TableCell>
								</TableRow>
							))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{formatToBRL(total)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}

        {presentationType === 'graphic' && (
          <div className="flex w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        </>
      )}
    </main>
  );
}
