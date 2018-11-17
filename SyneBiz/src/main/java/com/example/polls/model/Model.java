package com.example.polls.model;


import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.polls.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "model")
public class Model extends UserDateAudit {

 	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 140)
    private String name;

    @Lob @JsonProperty("image")
    private byte[] image;
    
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    private Brand brand;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    private Family family;
    
   
    private BigDecimal normal_price;
  
    private BigDecimal wholesale_price;
    @JsonBackReference
    private long wholesale_qtn;
    
   
    private char iscompatible;
    


	public BigDecimal getNormal_price() {
		return normal_price;
	}

	public void setNormal_price(BigDecimal normal_price) {
		this.normal_price = normal_price;
	}

	public BigDecimal getWholesale_price() {
		return wholesale_price;
	}

	public void setWholesale_price(BigDecimal wholesale_price) {
		this.wholesale_price = wholesale_price;
	}

	public long getWholesale_qtn() {
		return wholesale_qtn;
	}

	public void setWholesale_qtn(long wholesale_qtn) {
		this.wholesale_qtn = wholesale_qtn;
	}
	public char getIscompatible() {
		return iscompatible;
	}

	public void setIscompatible(char iscompatible) {
		this.iscompatible = iscompatible;
	}

	
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
	
	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}
	
	public Family getFamily() {
		return family;
	}

	public void setFamily(Family family) {
		this.family = family;
	}
}