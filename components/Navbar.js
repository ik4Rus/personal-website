import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import NavbarReactiveElement from "./NavbarReactiveControl";
import DarkmodeSwitch from "./DarkmodeSwitch";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavbarReactiveElement
                    item={{ name: "about", href: "/" }}
                    exact={true}
                  />
                  <NavbarReactiveElement
                    item={{ name: "experience", href: "/experience" }}
                    exact={false}
                  />
                  <NavbarReactiveElement
                    item={{ name: "blog", href: "/blog" }}
                    exact={false}
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <DarkmodeSwitch></DarkmodeSwitch>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {/* Current: "bg-red-50 border-red-500 text-red-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <NavbarReactiveElement
                item={{ name: "about", href: "/" }}
                exact={true}
                etype={"button"}
              />
              <NavbarReactiveElement
                item={{ name: "experience", href: "/experience" }}
                exact={true}
                etype={"button"}
              />
              <NavbarReactiveElement
                item={{ name: "blog", href: "/blog" }}
                exact={true}
                etype={"button"}
              />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
