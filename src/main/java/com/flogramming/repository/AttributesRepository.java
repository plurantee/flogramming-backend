package com.flogramming.repository;

import com.flogramming.domain.Attributes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Attributes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttributesRepository extends MongoRepository<Attributes, String> {}
