import MainLayout from "@/components/layout/MainLayout";

const LandingPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Landing Page</h1>
          <p className="text-xl text-muted-foreground">
            Página principal del sitio web
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
