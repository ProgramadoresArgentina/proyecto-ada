import { useUser } from "@auth0/nextjs-auth0/client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { UpdateProfile } from "../components/UpdateProfile/UpdateProfile";
import useScrollHideShow from "../hooks/useScrollHideShow";
import Logo from "../public/LogoProgramadoresArgentina.png";

const returnLink = `/api/auth/login?returnTo=${encodeURIComponent("/")}`;
const navigation = [
	{ name: "Blog", path: "/blog" },
	// { name: "Bolsa de Talentos", path: "/talentos" },
	{ name: "Contacto", path: "/#contact" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const { user } = useUser();
	const [openDialog, setOpenDialog] = useState(false);
	const elementRef = useRef<HTMLElement | null>(null);
	const hide = useScrollHideShow(elementRef);

	const handleDialog = () => {
		setOpenDialog(!openDialog);
	};

	return (
		<>
			<Disclosure
				ref={elementRef}
				as="nav"
				className={`bg-transparent fixed top-0 z-50 w-full  ${
					hide ? "hidden opacity-0" : "show-scroll backdrop-blur-md"
				}`}>
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white">
										<span className="sr-only">
											Open main menu
										</span>
										{open ? (
											<XMarkIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<Bars3Icon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className="flex items-center justify-center sm:items-stretch sm:justify-start w-full md:w-auto">
									<Link
										href="/"
										className="flex flex-shrink-0 items-center">
										<Image
											className="block h-8 w-auto"
											src={Logo}
											alt="Programadores Argentina"
										/>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.path}
												className="rounded-md px-3 text-white py-2 text-sm font-[600] hover:text-indigo-800">
												{item.name}
											</Link>
										))}
										<Link
											href="/generador-cv"
											className="rounded-md px-3 py-2  text-sm hover:text-indigo-800 plain-button">
											Generar mi CV
										</Link>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{/* Profile dropdown */}
									<Menu as="div" className="relative ml-3">
										<div className="flex items-center">
											<Menu.Button className="flex rounded-full text-sm items-center gap-5">
												<span className="sr-only">
													Open user menu
												</span>
												<img
													className="h-8 w-8 rounded-full"
													src={
														user
															? user.picture
															: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEedEwy284CMHPcPoYXz8i9K1BkGpLyHRUo2IleoVqnEa9cVD3pgtZdu0AHVQUnTDqKY&usqp=CAU"
													}
													alt={
														user
															? user.name
															: "Iniciar sesión"
													}
												/>
												<span className="text-white hidden md:block">
													{user
														? user.name
														: "Ingresar"}
												</span>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95">
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
												{user ? (
													<>
														<Menu.Item>
															{({ active }) => (
																<Link
																	href="/mi-perfil"
																	className={classNames(
																		active
																			? "bg-gray-100"
																			: "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}>
																	{
																		user.nickname
																	}
																</Link>
															)}
														</Menu.Item>
														{/* <Menu.Item>
															{({ active }) => (
																<div
																	onClick={
																		handleDialog
																	}
																	className={classNames(
																		active
																			? "bg-gray-100"
																			: "",
																		"block px-4 py-2 text-sm text-gray-700 cursor-pointer"
																	)}>
																	Actualizar
																	información
																</div>
															)}
														</Menu.Item> */}
														<Menu.Item>
															{({ active }) => (
																<Link
																	href="/blogs"
																	className={classNames(
																		active
																			? "bg-gray-100"
																			: "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}>
																	Mis Blogs
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link
																	href="/api/auth/logout"
																	className={classNames(
																		active
																			? "bg-gray-100"
																			: "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}>
																	Cerrar
																	sesión
																</Link>
															)}
														</Menu.Item>
													</>
												) : (
													<>
														<Menu.Item>
															{({ active }) => (
																<Link
																	href={
																		returnLink
																	}
																	className={classNames(
																		active
																			? "bg-gray-100"
																			: "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}>
																	Ingresar
																</Link>
															)}
														</Menu.Item>
													</>
												)}
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.path}
										className="block rounded-md px-3 py-2 text-base font-medium text-white">
										{item.name}
									</Disclosure.Button>
								))}
								<Disclosure.Button
									as="a"
									href="/generador-cv"
									className="block rounded-md px-3 py-2 text-base font-medium plain-button">
									Generar mi CV
								</Disclosure.Button>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			{openDialog && (
				<UpdateProfile
					openDialog={openDialog}
					handleDialog={handleDialog}
				/>
			)}
		</>
	);
}
