import { Button } from "@/components/ui/button";

export default function PDFTest() {
  const handleDownload = async () => {
    try {
      alert('Starting PDF test...');
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();
      
      doc.text('Test PDF', 20, 20);
      doc.save('test.pdf');
      alert('PDF downloaded!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Button onClick={handleDownload}>
      Test PDF Download
    </Button>
  );
}