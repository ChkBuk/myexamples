package com.example.polls.controller;

import java.net.URI;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.polls.model.Brand;
import com.example.polls.model.Model;
import com.example.polls.payload.ApiResponse;
import com.example.polls.payload.BrandRequest;
import com.example.polls.payload.ModelRequest;
import com.example.polls.payload.PagedResponse;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.BrandService;
import com.example.polls.service.ModelService;
import com.example.polls.util.AppConstants;

@RestController
@RequestMapping("/api/models")
public class ModelController {


    @Autowired
    private ModelService modelService;

    private static final Logger logger = LoggerFactory.getLogger(BrandController.class);

    @GetMapping
    public PagedResponse<Model> getModels(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
       
    	return modelService.getAllModels(currentUser, page, size);
    }
    @GetMapping("byfamily/{familyId}")
    public PagedResponse<Model> getModelsByFamilyId(@PathVariable Long familyId,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
       
    	return modelService.findByFamilyIdIn(familyId, page, size);
    }
    
    @GetMapping("bybrand/{brandId}")
    public PagedResponse<Model> getModelsByBrandId(@PathVariable Long brandId,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
       
    	return modelService.findByBrandIdIn(brandId, page, size);
    }  
    @GetMapping("bymodel/{modelId}")
    public PagedResponse<Model> getModelsById(@PathVariable Long modelId,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
       
    	return modelService.findById(modelId, page, size);
    }  
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createBrand(@Valid @RequestBody ModelRequest modelRequest) {
        Model model = modelService.createModel(modelRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{modelId}")
                .buildAndExpand(model.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Model Created Successfully"));
    }

}
