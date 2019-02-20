package edu.tamu.sage.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;

@Service
public class FileService {
    @Autowired
    private ResourcePatternResolver resourcePatternResolver;

    public File getFileFromResource(String fileName) throws IOException {
        Resource resource = resourcePatternResolver.getResource("classpath:"+fileName);
        if (resource.getURI().getScheme().equals("jar")) {
            return createTempFileFromStream(resource.getInputStream());
        }
        return resource.getFile();
    }

    private File createTempFileFromStream(InputStream stream) throws IOException {
        File tempFile = File.createTempFile("resource", ".tmp");
        tempFile.deleteOnExit();
        IOUtils.copy(stream, new FileOutputStream(tempFile));
        return tempFile;
    }
}
