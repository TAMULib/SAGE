package edu.tamu.sage.model;

public class EmailTemplate {

    private String name;

    private String subject;

    private String message;

    public EmailTemplate() {}

    /**
     * Create a new EmailTemplate
     *
     * @param name
     *            The new template's name.
     * @param subject
     *            The new template's subject.
     * @param message
     *            The new template's message
     */
    public EmailTemplate(String name, String subject, String message) {
        setName(name);
        setSubject(subject);
        setMessage(message);
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     *            the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the subject
     */
    public String getSubject() {
        return subject;
    }

    /**
     * @param subject
     *            the subject to set
     */
    public void setSubject(String subject) {
        this.subject = subject;
    }

    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message
     *            the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

}
