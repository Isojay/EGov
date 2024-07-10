package cbs.egov.Service;

import cbs.egov.Entity.BirthRecord;
import cbs.egov.Entity.DeathRecord;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;

@Service
public class PdfCertificateService {

    public byte[] generateDeathCertificate(DeathRecord deathRecord) throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage(new PDRectangle(PDRectangle.A6.getWidth(), PDRectangle.A6.getHeight()));
        document.addPage(page);

        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
            // Add logo
            PDImageXObject logo = PDImageXObject.createFromFile("/home/barkha/Documents/Study/EGov/src/main/resources/static/images/logo.png", document);
            contentStream.drawImage(logo, 40, 350, 70, 60); // Adjusted logo position downward

            // Add title
            contentStream.beginText();
            contentStream.setFont(PDType1Font.TIMES_BOLD, 14);
            contentStream.newLineAtOffset(120, 365); // Adjusted Y coordinate to align with the logo
            contentStream.showText("Death Certificate");
            contentStream.endText();

            // Draw a line below the title
            contentStream.setLineWidth(1.0f);
            contentStream.moveTo(30, 340);
            contentStream.lineTo(270, 340);
            contentStream.stroke();

            // Add content in list format
            contentStream.beginText();
            contentStream.setFont(PDType1Font.TIMES_ROMAN, 10);
            contentStream.setLeading(14f);
            contentStream.newLineAtOffset(30, 320);

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

            contentStream.showText("• Certificate Number: " + deathRecord.getId());
            contentStream.newLine();
            contentStream.showText("• Deceased Name: " + deathRecord.getDeceasedName());
            contentStream.newLine();
            contentStream.showText("• Date of Death: " + dateFormat.format(deathRecord.getDateOfDeath()));
            contentStream.newLine();
            contentStream.showText("• Place of Death: " + deathRecord.getPlaceOfDeath());
            contentStream.newLine();
            contentStream.showText("• Cause of Death: " + deathRecord.getCauseOfDeath());
            contentStream.newLine();
            contentStream.showText("• Registered by: " + deathRecord.getRegisteredBy());
            contentStream.newLine();
            contentStream.showText("• Registration Date: " + dateFormat.format(deathRecord.getRegistrationDate()));
            contentStream.endText();

            // Add signature image
            PDImageXObject signature = PDImageXObject.createFromFile("/home/barkha/Documents/Study/EGov/src/main/resources/static/images/signature.png", document);
            contentStream.drawImage(signature, 3, 90, 200, 40);

            // Add signature label
            contentStream.beginText();
            contentStream.setFont(PDType1Font.TIMES_ROMAN, 10);
            contentStream.newLineAtOffset(35, 75);
            contentStream.showText("Signature of Registrar");
            contentStream.endText();
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }

    public byte[] generateBirthCertificate(BirthRecord birthRecord) throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage(new PDRectangle(PDRectangle.A6.getWidth(), PDRectangle.A6.getHeight()));
        document.addPage(page);

        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
            // Add logo
            PDImageXObject logo = PDImageXObject.createFromFile("/home/barkha/Documents/Study/EGov/src/main/resources/static/images/logo.png", document);
            contentStream.drawImage(logo, 40, 350, 70, 60); // Adjusted logo position downward

            // Add title
            contentStream.beginText();
            contentStream.setFont(PDType1Font.TIMES_BOLD, 14);
            contentStream.newLineAtOffset(120, 365); // Adjusted Y coordinate to align with the logo
            contentStream.showText("Birth Certificate");
            contentStream.endText();

            // Draw a line below the title
            contentStream.setLineWidth(1.0f);
            contentStream.moveTo(30, 340);
            contentStream.lineTo(270, 340);
            contentStream.stroke();

            // Add content in list format
            contentStream.beginText();
            contentStream.setFont(PDType1Font.TIMES_ROMAN, 10);
            contentStream.setLeading(14f);
            contentStream.newLineAtOffset(30, 320);

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

            contentStream.showText("• Certificate Number: " + birthRecord.getId());
            contentStream.newLine();
            contentStream.showText("• Child's Full Name: " + birthRecord.getFirstName() + " " + birthRecord.getLastName());
            contentStream.newLine();
            contentStream.showText("• Date of Birth: " + dateFormat.format(birthRecord.getDateOfBirth()));
            contentStream.newLine();
            contentStream.showText("• Place of Birth: " + birthRecord.getBirthPlace());
            contentStream.newLine();
            contentStream.showText("• Father's Name: " + birthRecord.getFatherName());
            contentStream.newLine();
            contentStream.showText("• Mother's Name: " + birthRecord.getMotherName());
            contentStream.newLine();
            contentStream.showText("• Gender: " + birthRecord.getGender());
            contentStream.newLine();
            contentStream.showText("• Registered by: " + birthRecord.getRegisteredBy());
            contentStream.newLine();
            contentStream.showText("• Registration Date: " + dateFormat.format(birthRecord.getRegistrationDate()));
            contentStream.endText();

            // Add signature image
            PDImageXObject signature = PDImageXObject.createFromFile("/home/barkha/Documents/Study/EGov/src/main/resources/static/images/signature.png", document);
            contentStream.drawImage(signature, 3, 90, 200, 40);

            // Add signature label
            contentStream.beginText();
            contentStream.setFont(PDType1Font.TIMES_ROMAN, 10);
            contentStream.newLineAtOffset(35, 75);
            contentStream.showText("Signature of Registrar");
            contentStream.endText();
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }
}
