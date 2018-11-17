package com.example.polls.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import com.example.polls.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "brands")
public class Brand extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 140)
    private String name;

    @Lob @JsonProperty("image")
    private byte[] image;
    

/*    
    @OneToMany(
            mappedBy = "brand",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )    
    @Size(min = 0, max = 20)
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    private List<Family> family = new ArrayList<>();
    
  
    public List<Family> getFamily() {
		return family;
	}

	public void setFamily(List<Family> family) {
		this.family = family;
	}
*/
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
