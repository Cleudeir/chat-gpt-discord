import { useState } from "react";
import Layout from "../../components/common/Layout";
import ClientForm from "../../components/clients/form";
import { clientSchema } from "../../types/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function NewClientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);  
  const submit = (values: any) => {
    console.log("data:" ,  values);
    /*
    setIsLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    setIsLoading(false);
    if (res.ok) {
      router.push("/clients");
    } else {
      const message = await res.text();
      alert(message);
    }
    */
  };

  return (
    <Layout title="Novo Cliente" isLoading={isLoading}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center font-bold text-xl mb-4">
          <h1>Novo Cliente</h1>
        </div>
        <ClientForm submit={submit}/>
      </div>
    </Layout>
  );
}
