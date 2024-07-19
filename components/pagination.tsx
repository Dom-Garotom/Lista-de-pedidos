'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


type PaginationProp = {
  links: {
    url: string;
    label: string;
    active: boolean;
    id : number;
  }[];
}

export default function Pagination({ links }: PaginationProp) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams)

    if (pageNumber > 1) {
      params.set('page', pageNumber.toString())
    } else {
      params.delete('page')
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  function handleClickPageNext(direction: string) {
    const params = new URLSearchParams(searchParams)

    if (direction === 'previous') {
      let pageNumber = Number(params.get('page'))
      pageNumber = pageNumber - 1;
      params.set('page', pageNumber.toString())
    } else if (direction === 'next') {
      let pageNumber = Number(params.get('page'))
      pageNumber = pageNumber + 1;
      params.set('page', pageNumber.toString())
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleClickPageNext('previous')}
          />
        </PaginationItem>

        {links.map(link => {

          if (link.label.includes("Anterior") || link.label.includes('Próximo')) {
            return null;
          }

          if (link.label === '...') {
            <PaginationItem key={link.id} className="hidden md:inline-flex">
              <PaginationEllipsis />
            </PaginationItem>
          }

          return (

            <PaginationItem key={link.id} className="hidden md:inline-flex">
              <PaginationLink
                className='cursor-pointer'
                onClick={() => handleClickPage(Number(link.label))}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              >
              </PaginationLink>
            </PaginationItem>

          )

        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => handleClickPageNext('next')}
          />
        </PaginationItem>


        {/*
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink isActive={true}>1</PaginationLink>
        </PaginationItem>

         <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>2</PaginationLink>
        </PaginationItem>

        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>3</PaginationLink>
        </PaginationItem>

        

        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>8</PaginationLink>
        </PaginationItem>

        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>9</PaginationLink>
        </PaginationItem>

        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>10</PaginationLink>
        </PaginationItem> 
*/}


      </PaginationContent>
    </PaginationComponent>
  );
}
