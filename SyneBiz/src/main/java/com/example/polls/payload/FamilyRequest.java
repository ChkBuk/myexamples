package com.example.polls.payload;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.polls.model.Brand;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class FamilyRequest {

    @NotBlank
    @Size(max = 140)
    private String name;
    
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Brand brand;
   


	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



   

}
