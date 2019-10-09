/*
 * AppUser.java
 *
 * Version:
 *     $Id$
 *
 * Revisions:
 *     $Log$
 */
package edu.tamu.sage.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import edu.tamu.weaver.auth.model.AbstractWeaverUserDetails;
import edu.tamu.weaver.response.ApiView;
import edu.tamu.weaver.user.model.IRole;

/**
 * Application User entity.
 *
 * @author
 *
 */
@Entity
public class User extends AbstractWeaverUserDetails {

    private static final long serialVersionUID = -322779181704256964L;

    @Column(name = "role")
    private Role role;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @JsonView(ApiView.Partial.class)
    @Column(nullable = true, unique = true)
    private String email;

    @Column
    @JsonIgnore
    private String password = null;

    /**
     * Constructor for the application user
     *
     */
    public User() {
        super();
    }

    /**
     * Constructor for the application user
     *
     */
    public User(String email) {
        setUsername(email);
    }

    /**
     * Constructor for application user with external auth.
     *
     * @param uin
     *            Long
     *
     */
    public User(String email, String firstName, String lastName, String role) {
        this(email);
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setRole(Role.valueOf(role));
    }

    public User(String email, String firstName, String lastName, String role, String password) {
        this(email);
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setRole(Role.valueOf(role));
        setPassword(password);
    }

    public User(User user) {
        this(user.getUsername());
        setFirstName(user.getFirstName());
        setLastName(user.getLastName());
        setRole(user.getRole());
    }

    /**
     * @return the role
     */
    @Override
    @JsonDeserialize(as = Role.class)
    public IRole getRole() {
        return role;
    }

    /**
     * @param role
     *            the role to set
     */
    @Override
    @JsonSerialize(as = Role.class)
    public void setRole(IRole role) {
        this.role = (Role) role;
    }

    /**
     *
     * @return firstName
     *
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName
     *            String
     *
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return lastName
     *
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName
     *            String
     *
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email
     *            the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    /**
     * Stores an encoded password
     *
     * @param password
     *            the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(getRole().toString());
        authorities.add(authority);
        return authorities;
    }

}
