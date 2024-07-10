package cbs.egov.Controller;

import cbs.egov.Entity.BirthRecord;
import cbs.egov.Entity.DeathRecord;
import cbs.egov.Repo.BirthRecordRepository;
import cbs.egov.Repo.DeathRecordRepository;
import cbs.egov.Service.PdfCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/public/pdf")
public class PdfCertificateController {

    private final PdfCertificateService pdfCertificateService;

    private final DeathRecordRepository deathRecordRepository;
    private final BirthRecordRepository birthRecordRepository;

    @Autowired
    public PdfCertificateController(PdfCertificateService pdfCertificateService, DeathRecordRepository deathRecordRepository, BirthRecordRepository birthRecordRepository) {
        this.pdfCertificateService = pdfCertificateService;
        this.deathRecordRepository = deathRecordRepository;
        this.birthRecordRepository = birthRecordRepository;
    }

    @GetMapping("/generate/{id}")
    public ResponseEntity<ByteArrayResource> generatePdfCertificate(@PathVariable Long id) throws IOException {
        System.out.println(id);
        Optional<DeathRecord> deathRecord1 = deathRecordRepository.findById(Long.valueOf(id));
        if (deathRecord1.isPresent()) {
            byte[] pdfBytes = pdfCertificateService.generateDeathCertificate(deathRecord1.get());


            ByteArrayResource resource = new ByteArrayResource(pdfBytes);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=death_certificate.pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(pdfBytes.length)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        }
        return null;
    }

    @GetMapping("/generate/birth/{id}")
    public ResponseEntity<ByteArrayResource> generateBirthPdfCertificate(@PathVariable Long id) throws IOException {
        System.out.println(id);
        Optional<BirthRecord> deathRecord1 = birthRecordRepository.findById(Long.valueOf(id));
        if (deathRecord1.isPresent()) {
            byte[] pdfBytes = pdfCertificateService.generateBirthCertificate(deathRecord1.get());


            ByteArrayResource resource = new ByteArrayResource(pdfBytes);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=birth_certificate.pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(pdfBytes.length)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        }
        return null;
    }
}
