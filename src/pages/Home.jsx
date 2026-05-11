import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/features/products/ProductCard";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProducts,
  // getTotalProducts,
} from "@/services/products";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductFilter from "@/features/products/Productfilter";
import PriceFilter from "@/features/products/PriceFilter";
import ProductsFilter from "@/features/products/ProductsFilter";
import { useQueryParams } from "./UseQueryparams";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const { getParam, getNumber, getArray, setParams } = useQueryParams();
  const [allcategories, setAllCategories] = useState([]);
  const search = getParam("q") || "";
  const page = getNumber("page", 1);
  const sort = getParam("sort", "price-asc") || "price-asc";
  const selectCategories = getArray("category");
  const priceRange = getParam("price") || "";
  const start = (page - 1) * 7 + 1;
  const end = start + products.length - 1;

  useEffect(() => {
    console.log(
      "parametros,",
      search,
      page,
      sort,
      selectCategories,
      priceRange,
    );
    console.log(Array.isArray(selectCategories));
    const controller = new AbortController();
    getProducts({
      page,
      sort,
      search,
      selectCategories,
      priceRange,
    })
      .then(({ data, total }) => {
        setProducts(data);
        setTotalPages(Math.ceil(total / 7));
        setTotalItems(total);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log("vasoc", error);
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [search, page, sort, selectCategories.join(","), priceRange]);

  // useEffect(() => {
  //   getTotalProducts().then((dados) => setTotalItems(dados));
  // }, []);
  useEffect(() => {
    getCategories().then((dados) => setAllCategories(dados));
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-2 min-h-screen py-8">
      {/* <div>
        <Field className="w-50" orientation="horizontal">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="search"
            placeholder="Search..."
          />
        </Field>
      </div> */}
      <div className="grid grid-cols-4 gap-3">
        <ProductsFilter categories={allcategories} />

        <div className="col-span-3">
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm">
              Mostrando{" "}
              <span className="font-bold">
                {end} de {totalItems} produtos
              </span>
            </p>
            <Select
              value={sort}
              onValueChange={(value) => {
                setParams({
                  sort: value,
                  page: 1,
                });
              }}
            >
              <SelectTrigger className="w-50 ">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent position="popper" className="">
                <SelectGroup>
                  <SelectItem value="price-asc">Menor Preco</SelectItem>
                  <SelectItem value="price-desc">Maior Preco</SelectItem>
                  <SelectItem value="name-asc">Nome A-Z</SelectItem>
                  <SelectItem value="name-desc">Nome Z-A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-6">
              {loading ? (
                <Spinner></Spinner>
              ) : (
                products.map((p) => (
                  <ProductCard key={p.id} product={p}></ProductCard>
                ))
              )}
            </div>
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
                    return (
                      num !== 1 &&
                      num !== totalPages &&
                      Math.abs(num - page) <= 1
                    );
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
          </div>
        </div>
      </div>
    </div>
  );
}
