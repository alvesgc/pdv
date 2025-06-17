import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  UserIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

const SideBar = ({ visible, onClose }) => {
  const sidebarRef = useRef();
  const [openConfig, setOpenConfig] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const toggleConfig = () => setOpenConfig(!openConfig);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-[60px] left-0 h-full bg-gray-900 text-white w-64 p-4 transition-transform duration-150 z-50 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <a href="/" className="flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/140769066?s=96&v=4"
            className="h-6 me-3 sm:h-7"
            alt="NeoPDV Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            NeoPDV
          </span>
        </a>
        <button onClick={onClose} className="text-white text-xl">
          <XMarkIcon className="size-6" />
        </button>
      </div>

      {/* Main List */}
      <List className="text-white">
        <ListItem className="hover:bg-gray-800 rounded transition-colors duration-150">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 w-full"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Vendas
          </Link>
        </ListItem>

        <ListItem className="hover:bg-gray-800 rounded transition-colors duration-150">
          <Link
            to="/products"
            onClick={onClose}
            className="flex items-center gap-2 w-full"
          >
            <CircleStackIcon className="h-5 w-5" />
            Produtos
          </Link>
        </ListItem>

        <ListItem className="hover:bg-gray-800 rounded transition-colors duration-150">
          <Link
            to="/stock"
            onClick={onClose}
            className="flex items-center gap-2 w-full"
          >
            <CircleStackIcon className="h-5 w-5" />
            Estoque
          </Link>
        </ListItem>

        <ListItem className="hover:bg-gray-800 rounded transition-colors duration-150">
          <Link
            to="/log"
            onClick={onClose}
            className="flex items-center gap-2 w-full"
          >
            <ClipboardDocumentListIcon className="h-5 w-5" />
            Log
          </Link>
        </ListItem>

        {/* Linha separadora */}
        <hr className="my-4 border-gray-700" />

        {/* Configurações Accordion */}
        <Accordion open={openConfig}>
          <ListItem className="p-0">
            <AccordionHeader
              onClick={toggleConfig}
              className="text-white border-b-0 px-3 py-2 hover:bg-gray-800 rounded transition-colors duration-150"
            >
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Configurações
              </Typography>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-4 w-4 transition-transform ${
                  openConfig ? "rotate-180" : ""
                }`}
              />
            </AccordionHeader>
          </ListItem>

          <AccordionBody className="py-1 pl-8">
            <List className="p-0 text-sm text-white">
              <ListItem className="hover:bg-gray-800 rounded transition-colors duration-150">
                <Link
                  to="/settings/payment-types"
                  onClick={onClose}
                  className="flex items-center gap-2 w-full"
                >
                  <CreditCardIcon className="h-4 w-4" />
                  Tipos de Pagamento
                </Link>
              </ListItem>
              <ListItem className="hover:bg-gray-800 rounded transition-colors duration-150">
                <Link
                  to="/settings/users"
                  onClick={onClose}
                  className="flex items-center gap-2 w-full"
                >
                  <UserIcon className="h-4 w-4" />
                  Usuários
                </Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </div>
  );
};

export default SideBar;
