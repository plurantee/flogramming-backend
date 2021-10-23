package com.flogramming.repository;

import com.flogramming.domain.Products;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Products entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductsRepository extends MongoRepository<Products, String> {}
