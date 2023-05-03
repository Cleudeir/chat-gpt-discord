import { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import Tbody from '../../components/clients/table/Tbody';
import { Client } from '@/types/client';
import Link from 'next/link';

const Clients = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(null);

  useEffect(() => {
    setLoading(false);
    fetch('/api/clients')
      .then( (response) => {
        if (!response.ok) throw new Error(response.statusText);
        return  response.json();
      })
      .then((data) => setClients(data))
      .catch((error) => setErrorMsg(error.message))
      .finally(() => setLoading(true));      
  }, []);

  useEffect(() => {
     console.log(clients)
  }, [clients]);

  return (
    <Layout title="Clients" isLoading={isLoading} messageError={errorMsg}>
      <div className="mb-5">
        <Link
          href="/clients/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Client
        </Link>
      </div>
      <Tbody clients={clients} />
    </Layout>
  );
};

export default Clients;
/*@Autowired
	private ClienteService clienteService;
	
	@PostMapping("/cadastrar")
	public ResponseEntity<Object> cadastrarCliente(@RequestBody ClienteDTO clienteDTO){
		return clienteService.cadastrarCliente(clienteDTO);
	}
	
	@PutMapping("/atualizar/{id}")
	public void atualizarCliente(@PathVariable("id") Long id, @RequestBody ClienteDTO clienteDTO) {
		clienteService.atualizarCliente(id, clienteDTO);
	}
	
	@GetMapping("/listar")
	public ResponseEntity<List<Cliente>> listarCliente(){
		return clienteService.listarClientes();
	}
	
	@DeleteMapping("/deletar/{id}")
	public void deletarCliente(@PathVariable("id") Long id) {
		clienteService.deletarCliente(id);
	}*/