import { Button } from "@/components/ui/button";
import Heading from "@/components/shared/Heading";
import Text from "@/components/shared/Text";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BASE_URL from "@/services/api";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [mainImg, setMainImg] = useState("");
  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((dados) => setProduct(dados));
  }, [id]);
  return (
    <div className="w-full max-w-6xl min-h-screen mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-8">
        <div className="flex flex-col gap-3">
          <img
            src={mainImg || product.images?.[0]}
            className="w-full rounded-lg border border-gray-300"
          />
          {console.log(product)}
          <div className="flex flex-row gap-2 items-center justify-center">
            {product.images?.map((i, index) => (
              <img
                key={index}
                src={i}
                className={`w-16 h-16 rounded-lg p-2 cursor-pointer border
                  ${mainImg === i ? "border-blue-500" : "border-gray-300"}
                `}
                onClick={() => setMainImg(i)}
                onMouseEnter={() => setMainImg(i)}
              />
            ))}
          </div>
        </div>
        {/* info */}
        <div className="flex flex-col gap-5">
          <div>
            <Heading level="h2">{product.name}</Heading>
            <Text variant="small">vendido por alguma coisa</Text>
          </div>

          <Heading level="h3">{product.price}</Heading>
          <Text>
            descricao longa do produto Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Tenetur tempora, numquam ducimus ipsum possimus
            qui, voluptatibus recusandae sit, expedita unde provident nihil!
            Aliquid magni saepe consectetur explicabo molestiae vel eius! Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Eum facere,
            nulla officiis in quos tenetur vel adipisci ducimus aperiam est,
            cum, ratione dolorum. Nesciunt iusto non veniam unde illum deserunt.
          </Text>

          <div className="flex flex-row gap-3 w-full">
            <div className="px-4 py-2 gap-4 flex flex-row items-center justify-around rounded-full border border-1 border-black">
              <Button variant="variant">-</Button>
              <Text className="small">1</Text>
              <Button variant="variant">+</Button>
            </div>
            <Button className="px-4 py-2 h-full">adicionar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
