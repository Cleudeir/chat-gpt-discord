import Layout from "../components/common/Layout";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <div className="text-3xl font-bold mb-6">Welcome to your Supermarket System!</div>
      <div className="text-lg mb-6">
        Where do you want to go? Use the navigation bar on the left to get started.
      </div>
      <div className="text-lg font-semibold">Quick shortcuts:</div>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-1">
          <a href="/clients">Manage clients</a>
        </li>
        <li className="mb-1">
          <a href="/employees">Manage employees</a>
        </li>
        <li className="mb-1">
          <a href="/products">Manage products</a>
        </li>
      </ul>
    </Layout>
  );
}
