'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronsDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { Order } from '@/lib/types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


const formattter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
});

type OrdersTableProps = { orders: Order[] }


export default function OrdersTable({ orders }: OrdersTableProps) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleClick(key : string) {
    const params = new URLSearchParams(searchParams)

    if (params.get('sort') === key){
      params.set('sort' , `-${key}`);
    } else if (params.get('sort') === `-${key}`){
      params.delete('sort');
    } else if (key){
      params.set('sort', key);
    }

    replace(`${pathName}?${params.toString()}`, {scroll:false});

  }

  function getSortIcon (key : string){

    if ( searchParams.get('sort') === key ) {

      return <ChevronsDown className='w-4' />

    } else if ( searchParams.get('sort') === `-${key}` ) {

      return <ChevronUp className='w-4' />

    } 

    return <ChevronsUpDown className='w-4' />
  }



  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">

          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>

          <TableHead className=" hidden md:table-cell cursor-pointer justify-end items-center gap-1" onClick={ () => handleClick('order_date') }>
            <div className="flex items-center gap-1">
              Data
              {getSortIcon('order_date')}
            </div>
          </TableHead>

          <TableHead className="text-right cursor-pointer flex justify-end items-center gap-1"  onClick={ () => handleClick('amount_in_cent') }>
            Valor
            { getSortIcon('amount_in_cent')}
          </TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (

          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {order.status === 'pending' ? 'Pendente' : 'Completo'}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{order.order_date.toString()}</TableCell>
            <TableCell className="text-right">{formattter.format(order.amount_in_cents / 100)}</TableCell>
          </TableRow>

        ))}
      </TableBody>
    </Table>
  );
}
