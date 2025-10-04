import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WeeklyPlan } from '../types';
import DayCard from './DayCard';

interface MealPlanDisplayProps {
    plan: WeeklyPlan;
    onSavePlan: () => void;
    sleepRecommendation: string | null;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ plan, onSavePlan, sleepRecommendation }) => {
    const planGridRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = async () => {
        const contentToExport = planGridRef.current;
        if (!contentToExport) return;

        setIsExporting(true);

        try {
            const canvas = await html2canvas(contentToExport, {
                scale: 2,
                backgroundColor: '#1f2937', // bg-gray-800, for DayCard background
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;

            const contentWidth = pageWidth - margin * 2;
            const contentHeight = pageHeight - margin * 2 - 15; // Reserve space for header/footer

            const imgWidth = contentWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            const totalPages = Math.ceil(imgHeight / contentHeight);

            for (let i = 1; i <= totalPages; i++) {
                if (i > 1) {
                    pdf.addPage();
                }

                // --- Header ---
                pdf.setFontSize(16);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(44, 62, 80); // Darker text color
                pdf.text('NutriGenius: Plan Nutricional Semanal', pageWidth / 2, margin, { align: 'center' });

                // --- Image Slice ---
                const positionY = -((i - 1) * contentHeight);
                pdf.addImage(imgData, 'PNG', margin, margin + 10, imgWidth, imgHeight, undefined, 'FAST');

                // --- Footer ---
                pdf.setFontSize(10);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(128, 128, 128); // Gray color for footer
                
                const dateStr = `Generado el: ${new Date().toLocaleDateString('es-ES')}`;
                pdf.text(dateStr, margin, pageHeight - margin / 2);

                const pageStr = `Página ${i} de ${totalPages}`;
                pdf.text(pageStr, pageWidth - margin, pageHeight - margin / 2, { align: 'right' });
            }

            pdf.save('plan-nutricional.pdf');
        } catch (error) {
            console.error("Error al exportar a PDF:", error);
            alert("Hubo un problema al generar el PDF. Por favor, inténtalo de nuevo.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center border-b-2 border-green-500 pb-2 gap-4">
                 <h2 className="text-3xl font-bold text-gray-100">Tu Plan de Nutrición Semanal</h2>
                 <div className="flex items-center space-x-2">
                    <button
                        onClick={onSavePlan}
                        className="flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" />
                        </svg>
                        Guardar Plan
                    </button>
                    <button
                        onClick={handleExportPDF}
                        disabled={isExporting}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors disabled:bg-gray-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {isExporting ? 'Exportando...' : 'Exportar a PDF'}
                    </button>
                 </div>
            </div>
            
            {sleepRecommendation && (
                <div className="bg-gray-800 p-4 rounded-lg border border-sky-700/50 shadow-lg flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400 mt-1" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sky-300 text-lg">Recomendación de Sueño Personalizada</h3>
                        <p className="text-gray-300">{sleepRecommendation}</p>
                    </div>
                </div>
            )}

            <div className="bg-gray-900" id="pdf-content-wrapper">
                <div ref={planGridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-1">
                    {plan.map((dailyPlan) => (
                        <DayCard key={dailyPlan.day} dailyPlan={dailyPlan} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealPlanDisplay;