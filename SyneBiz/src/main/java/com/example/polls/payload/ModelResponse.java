package com.example.polls.payload;

import java.math.BigDecimal;

public class ModelResponse {


	private Long id;
	private String name;
    private byte[] image;
    private char iscompatible;
	private BigDecimal normal_price;	   
    private BigDecimal wholesale_price;   
    private long wholesale_qtn;
    
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

	public void setWholesale_qtn(int wholesale_qtn) {
		this.wholesale_qtn = wholesale_qtn;
	}

    
    public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
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

}
