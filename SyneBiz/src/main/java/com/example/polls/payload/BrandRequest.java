package com.example.polls.payload;

import java.util.Set;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.polls.model.Family;
import com.fasterxml.jackson.annotation.JsonProperty;

public class BrandRequest {
    @NotBlank
    @Size(max = 140)
    private String name;

    @Lob @JsonProperty("image")
    private byte[] image;
    


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
