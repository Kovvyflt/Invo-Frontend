import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DownloadButton({ sales, filter, range }) {
  const downloadPDF = () => {
    if (sales.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`📊 ${filter.toUpperCase()} Sales Report`, 14, 15);

    if (range?.start && range?.end) {
      doc.setFontSize(10);
      doc.text(
        `Range: ${new Date(range.start).toLocaleDateString()} - ${new Date(
          range.end
        ).toLocaleDateString()}`,
        14,
        22
      );
    }

    const tableColumn = ["Product", "SKU", "Qty", "Price", "Total", "Sold By", "Date"];
    const tableRows = sales.map((s) => [
      s.productName,
      s.sku,
      s.quantity,
      `$${s.priceAtSale}`,
      `$${s.total}`,
      s.soldBy,
      new Date(s.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 28 });
    doc.save(`${filter}-sales-report.pdf`);
  };

  return (
    <button
      className="btn--download"
      onClick={downloadPDF}
      disabled={!sales || sales.length === 0}
    >
      ⬇ Download PDF
    </button>
  );
}
