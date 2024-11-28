// "use client";

// import { ReactNode, useState } from "react";
// import { graphql } from "@/graphql/gql";
// import { ItemFragment } from "@/graphql/gql/graphql";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@urql/next";
// import { Modal } from "./Modal";
// import { FormField } from "./FormField";
// import { useSession } from "@/supabase/SupabaseSessionProvider";
// import { User } from "@supabase/supabase-js";

// const INSERT_ITEM = graphql(`
//   mutation InsertItem($item: itemInsertInput!) {
//     insertIntoitemCollection(objects: [$item]) {
//       affectedCount
//     }
//   }
// `);

// export type NewItem = Partial<Omit<ItemFragment, "id" | "__typename">>;
// export type NewItemDialogProps = {
//   trigger?: ReactNode;
// };

// export default function NewItemModal({ trigger }: NewItemDialogProps) {
//   const [open, setOpen] = useState(false);
//   const session = useSession();
//   const user = session.session?.user;

//   const [, insert] = useMutation(INSERT_ITEM);
//   const { control, handleSubmit } = useForm<NewItem>();

//   const onSubmit = async (newItem: NewItem, user: User) => {
//     // TODO: handle error
//     await insert({ item: { ...newItem, created_by_user_id: user.id } });
//     setOpen(false);
//   };

//   if (!user) return <h1>...loading</h1>;

//   return (
//     <Modal open={open} onOpenChange={setOpen} trigger={trigger}>
//       <form onSubmit={handleSubmit((newItem) => onSubmit(newItem, user))}>
//         <FormField control={control} name="name" label="Name" isRequired />
//         <button type="submit">Save</button>
//       </form>
//     </Modal>
//   );
// }
