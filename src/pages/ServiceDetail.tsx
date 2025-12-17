import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { servicesData } from "@/data/services";
import { Check, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServiceDetail = () => {
    const { slug } = useParams<{ slug: string }>();

    // Ensure scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const service = slug ? servicesData[slug as keyof typeof servicesData] : null;

    if (!service) {
        return <Navigate to="/" replace />;
    }

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al Inicio
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                        {service.title}
                    </h1>
                    <p className="text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md">
                        {service.shortDesc}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Left Column: Content */}
                        <div className="lg:w-2/3 space-y-8">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Descripción del Servicio</h2>
                                <div className="prose prose-lg text-slate-600 max-w-none">
                                    <p>{service.fullDesc}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Características Principales</h2>
                                <ul className="space-y-4">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="mt-1 p-1 bg-orange-100 rounded-full shrink-0">
                                                <Check className="h-4 w-4 text-orange-600" />
                                            </div>
                                            <span className="text-slate-700 text-lg">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-24 space-y-6">
                                <div className="bg-blue-600 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
                                    {/* Decorative circle */}
                                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                                    <h3 className="text-2xl font-bold mb-4">¿Necesitas una cotización formal?</h3>
                                    <p className="text-blue-100 mb-8">
                                        Nuestro equipo está listo para atender tu solicitud. Recibe atención personalizada e inmediata.
                                    </p>

                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none shadow-lg hover:shadow-xl transition-all h-14 text-lg font-semibold"
                                    >
                                        <a
                                            href={`https://wa.me/528441010286?text=${encodeURIComponent(service.ctaMessage)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle className="h-5 w-5" />
                                            Solicitar Cotización
                                        </a>
                                    </Button>

                                    <div className="mt-6 pt-6 border-t border-blue-500/50 text-center">
                                        <p className="text-blue-200 text-sm mb-1">
                                            Atención Lunes a Viernes 9am-6pm
                                        </p>
                                        <p className="text-blue-100 text-xs font-medium bg-blue-700/50 py-1 px-3 rounded-full inline-block">
                                            Asistente IA disponible 24/7
                                        </p>
                                    </div>
                                </div>

                                {/* Additional Info Card (Optional context) */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-slate-600 text-sm">
                                    <p>
                                        <strong className="text-slate-900 block mb-1">Cobertura Nacional</strong>
                                        Realizamos envíos y servicios en toda la República Mexicana.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ServiceDetail;
