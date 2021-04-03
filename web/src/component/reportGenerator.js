import jsPDF from 'jspdf'
import 'jspdf-autotable'


// define a generatePDF function that accepts a tickets argument

const generatePDF =  (invoiceType) => {
  
const doc = new jsPDF()
console.log(invoiceType)

doc.autoTable({
  head: [[invoiceType+ " Invoices"]],
  columnStyles: {
    columnWidth:25},
styles: {
    fontSize: 15,
    cellPadding: 1,
    textColor: [0,0,128],
    fillColor :[255,255,255],
    
}
 
})
doc.autoTable({ html: '#invoices'} )
doc.autoTable({
  head: [['Report Generated on '+new Date().toISOString().slice(0, 10)]],
  columnStyles: {
    columnWidth:25},
styles: {
    fontSize: 5,
    cellPadding: 1,
    textColor: [0,0,0],
    fillColor :[255,255,255],
    
}
})







doc.save(invoiceType+ "_"+new Date().toISOString().slice(0, 10)+" invoices.pdf")

  }
export default generatePDF;