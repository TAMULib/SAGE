package edu.tamu.sage.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.tamu.sage.model.EmailTemplate;

@Service
public class EmailTemplateService {
	@Autowired
	FileService fileService;

    @Autowired
    private ObjectMapper objectMapper;

	public EmailTemplate getEmailTemplate(String templateName) throws IOException {
        EmailTemplate emailTemplate = objectMapper.readValue(fileService.getFileFromResource("config/emails/" + templateName+".json"), new TypeReference<EmailTemplate>() {});
		return emailTemplate;
	}

	public EmailTemplate buildEmail(String templateName, Map<String, String> parameters) {
		EmailTemplate emailTemplate = null;
		try {
			emailTemplate = getEmailTemplate(templateName);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return templateParameters(emailTemplate,parameters);

	}

    public EmailTemplate templateParameters(EmailTemplate emailTemplate, Map<String, String> parameters) {
        emailTemplate.setSubject(templateEmailSection(emailTemplate.getSubject(),parameters));
        emailTemplate.setMessage(templateEmailSection(emailTemplate.getMessage(),parameters));
        return emailTemplate;
    }

    protected String templateEmailSection(String emailSection, Map<String, String> parameters) {
        for (String name : parameters.keySet()) {
            emailSection = emailSection.replaceAll("\\{" + name + "\\}", parameters.get(name));
        }
        return emailSection;
    }

}
