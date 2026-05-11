import { useState } from "react";
import logo from "../../../public/favicon.svg";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { IoCartOutline } from "react-icons/io5";
import { useQueryParams } from "@/pages/UseQueryparams";
import { useCart } from "@/features/cart/CartContext";
import { Link } from "react-router-dom";
export default function Header() {
  const { setParams } = useQueryParams();
  const [inputValue, setInputValue] = useState("");
  const { totalItems } = useCart();
  return (
    <div className="w-full py-4 px-4">
      <div className="flex items-center justify-between py-4 px-6 max-w-7xl bg-[#2563EB] mx-auto rounded-md">
        <img src={logo} alt="imagem" className="w-40 h-8" />

        <div className="flex-1 max-w-lg  mx-6">
          <Field>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setParams({
                  q: inputValue,
                  page: 1,
                });
              }}
            >
              <Input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                type="search"
                placeholder="Search..."
                className="bg-white "
              ></Input>
            </form>
          </Field>
        </div>

        <Link to="/carrinho">
          {" "}
          <div className="relative">
            <Button className="rounded-full bg-white">
              <IoCartOutline className="text-black" />
            </Button>
            <span className="absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full  flex items-center justify-center text-white">
              {totalItems}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

// import logo from "../../../public/favicon.svg";
// import { Button } from "../ui/button";
// import { Field } from "../ui/field";
// import { Input } from "../ui/input";
// import { IoCartOutline } from "react-icons/io5";

// export default function Header() {
//   return (
//     <header className="w-full bg-blue-800">
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
//         {/* LOGO */}
//         <img src={logo} alt="logo" className="w-32 h-8" />

//         {/* SEARCH */}
//         <div className="flex-1 max-w-md mx-6">
//           <Field>
//             <Input
//               type="search"
//               placeholder="Buscar produtos..."
//               className="bg-white"
//             />
//           </Field>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex items-center gap-4">
//           {/* LOGIN */}
//           <Button variant="ghost" className="text-white">
//             Entrar
//           </Button>

//           {/* CART */}
//           <div className="relative">
//             <Button className="rounded-full bg-white">
//               <IoCartOutline className="text-black text-xl" />
//             </Button>

//             {/* BADGE */}
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               2
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
