// import { getStatusColorClass } from "@/helpers/statusColorClassHelper";
// import UserOne from "@/images/user.png";
// import {
//   ArrowDown,
//   EyeIcon,
//   PenBoxIcon,
//   PlusIcon,
//   Users2Icon,
//   WorkflowIcon,
// } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import ModalComponent from "../Modal";
// import UpdateWorker from "../form/UpdateWorkerForm";
// import { TableListServices } from "../tables/service/ServiceTable";
// import ServiceCard from "./ServiceMiniCard";
// import ShiftCard from "./ShiftMiniCard";
// import TeamCard from "./TeamMiniCard";

// interface WorkCardProps {
//   workDescription: string;
//   company: string;
//   nameResponsible: string;
//   phoneContact: string;
//   address: string;
//   logoUrl: string;
//   active: string;
//   id: number;
//   countService: string;
//   countTeam: string;
//   countShift: string;
// }

// export default function WorkCard({
//   workDescription,
//   company,
//   nameResponsible,
//   address,
//   phoneContact,
//   logoUrl,
//   active,
//   id,
//   countService,
//   countTeam,
//   countShift,
// }: WorkCardProps): JSX.Element {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const toggleCard = () => {
//     setIsOpen(!isOpen);
//   };

//   const statusColorClass = getStatusColorClass(active);

//   return (
//     <>
//       <div className="flex w-full">
//         <div className="w-full rounded-lg bg-card shadow-sm">
//           <div className="relative">
//             <div className="relative rounded-t-lg bg-cover p-6">
//               <div className="flex justify-between">
//                 <div className="flex flex-col items-start gap-2 font-bold text-foreground">
//                   <p className="w-full rounded-full">{workDescription}</p>
//                   <p
//                     className={`flex items-center justify-center rounded px-2 py-1 ${statusColorClass}`}
//                   >
//                     {active === "true" ? "Ativa" : "Inativa"}
//                   </p>
//                 </div>
//                 <div>
//                   <button
//                     className={`card-header ${isOpen ? "active" : ""}`}
//                     onClick={toggleCard}
//                   >
//                     <ArrowDown />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {isOpen && (
//             <div className="relative p-6">
//               <div className=" flex flex-col justify-start gap-4 ">
//                 <div className="text-2xl font-black leading-none text-primary">
//                   {company}
//                 </div>
//                 <div className="flex justify-between ">
//                   <div className="flex items-center gap-4 ">
//                     <div className=" w-12 rounded-full border-2 border-primary">
//                       <Image
//                         src={logoUrl || UserOne}
//                         alt="User"
//                         width={100}
//                         height={100}
//                         quality={80}
//                       />
//                     </div>
//                     <div className="text-xs text-foreground">
//                       <p>
//                         Resp: <span>{nameResponsible}</span>
//                       </p>
//                       <p>
//                         Contato: <span>{phoneContact}</span>
//                       </p>
//                       <p>
//                         Endereço: <span>{address}</span>
//                       </p>
//                     </div>
//                     <ModalComponent
//                       isOpen={showModal}
//                       onClose={handleCloseModal}
//                       modalName="Atualizar Serviço"
//                       modalContent={<UpdateWorker workId={id} />}
//                     />
//                     <div className="flex h-10 w-10 rounded-full text-primary hover:bg-primary hover:text-background">
//                       <button
//                         className="flex h-full w-full items-center justify-center"
//                         onClick={toggleModal}
//                       >
//                         <PenBoxIcon />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
//                   <TableListServices workId={id} />
//                   <ServiceCard
//                     icon={WorkflowIcon}
//                     amount={`${countService}`}
//                     description="Total de Serviços"
//                     viewLink={`/obras/service/read/${id}`}
//                     viewIconLink={EyeIcon}
//                     newIconLink={PlusIcon}
//                     workId={id}
//                   />{" "}
//                   <TeamCard
//                     icon={Users2Icon}
//                     amount={`${countTeam}`}
//                     description="Equipes"
//                     viewLink={`/obras/team/read/${id}`}
//                     viewIconLink={EyeIcon}
//                     newIconLink={PlusIcon}
//                     workId={id}
//                   />
//                   <ShiftCard
//                     icon={Users2Icon}
//                     amount={`${countShift}`}
//                     description="Turnos"
//                     viewLink={`/obras/shift/read/${id}`}
//                     viewIconLink={EyeIcon}
//                     newIconLink={PlusIcon}
//                     workId={id}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
