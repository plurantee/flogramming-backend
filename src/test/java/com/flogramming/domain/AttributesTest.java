package com.flogramming.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.flogramming.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AttributesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attributes.class);
        Attributes attributes1 = new Attributes();
        attributes1.setId("id1");
        Attributes attributes2 = new Attributes();
        attributes2.setId(attributes1.getId());
        assertThat(attributes1).isEqualTo(attributes2);
        attributes2.setId("id2");
        assertThat(attributes1).isNotEqualTo(attributes2);
        attributes1.setId(null);
        assertThat(attributes1).isNotEqualTo(attributes2);
    }
}
