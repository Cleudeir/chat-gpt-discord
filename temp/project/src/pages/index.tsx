import Image from 'next/image';
import Layout from '../components/common/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center mt-12">
        <h1 className="font-bold text-4xl text-center">Welcome to SuperMarket System</h1>
        <div className="mt-8">
          <Image src="/images/supermarket.jpg" alt="Supermarket" width={800} height={500} />
        </div>
        <div className="mt-8">
          <a href="/clients">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Clien            </button>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
