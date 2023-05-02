import Layout from "../components/common/Layout";

export default function Home() {
  return (
    <Layout title="Home">
      <div className="max-w-4xl m-auto">
        <h1 className="text-2xl font-bold mt-4 mb-8">Welcome to Supermarket System!</h1>
        <p className="text-justify">
          Here you can manage your clients' information, including their personal data and address, and keep track of all your products and employees. Feel free to explore the links in the sidebar to access the different pages and features of our app.
        </p>
        <p className="text-justify mt-8">
          This web application was created by [YOUR-NAME] using Next.js, React, and Tailwind CSS. Check out the source code on GitHub: <a href="https://github.com/YOUR-GITHUB-USERNAME/supermarket-system">https://github.com/YOUR-GITHUB-USERNAME/supermarket-system</a>.
        </p>
      </div>
    </Layout>
  );
}
