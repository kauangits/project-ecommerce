import { useQueryParams } from "../../pages/UseQueryparams";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function ProductPagination({ page, setLoading, totalPages }) {
  const { setParams } = useQueryParams();
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setLoading(true);
                setParams({
                  page: page - 1,
                });
              }}
            ></PaginationPrevious>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive={page === 1}
            onClick={() => {
              setLoading(true);
              setParams({ page: 1 });
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {page >= 3 && (
          <PaginationItem>
            <PaginationEllipsis></PaginationEllipsis>
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((num) => {
            return num !== 1 && num !== totalPages && Math.abs(num - page) <= 1;
          })
          .map((num) => (
            <PaginationItem key={num}>
              {console.log(num)}
              <PaginationLink
                isActive={num === page}
                onClick={() => {
                  if (page === num) return;

                  setLoading(true);
                  setParams({
                    page: num,
                  });
                }}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ))}
        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis></PaginationEllipsis>
          </PaginationItem>
        )}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              isActive={page === totalPages}
              onClick={() => {
                setLoading(true);
                setParams({ page: totalPages });
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setLoading(true);
                setParams({
                  page: page + 1,
                });
              }}
            ></PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
