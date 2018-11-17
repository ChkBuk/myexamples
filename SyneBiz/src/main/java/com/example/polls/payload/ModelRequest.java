package com.example.polls.payload;



import java.math.BigDecimal;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.polls.model.Brand;
import com.example.polls.model.Family;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ModelRequest {

    @NotBlank
    @Size(max = 140)
    private String name;

    @Lob @JsonProperty("image")
    private byte[] image;
    
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Brand brand;
   

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Family family;
    
    
    private BigDecimal normal_price;
    
    private BigDecimal wholesale_price;
    @JsonBackReference
    private long wholesale_qtn;
    
    private char iscompatible;
    
	public char getIscompatible() {
		return iscompatible;
	}

	public void setIscompatible(char iscompatible) {
		this.iscompatible = iscompatible;
	}

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

	public String getName() {
		return name;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public void setName(String name) {
		this.name = name;
	}

   

}
