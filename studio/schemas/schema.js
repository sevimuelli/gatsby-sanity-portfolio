// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import aboutMe from './documents/aboutMe'
import archive from './documents/archive'
import category from './documents/category'
import contact from './documents/contact'
import introPage from './documents/introPage'
import person from './documents/person'
import projectOverview from './documents/projectOverview'
import sampleProject from './documents/sampleProject'
import siteSettings from './documents/siteSettings'
import tag from './documents/tag'

// Object types
import bioPortableText from './objects/bioPortableText'
import figure from './objects/figure'
import fileUpload from './objects/fileUpload'
import projectMember from './objects/projectMember'
import projectPortableText from './objects/projectPortableText'
import simplePortableText from './objects/simplePortableText'
import skill from './objects/skill'
import work from './objects/work'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    bioPortableText,
    figure,
    fileUpload,
    projectMember,
    projectPortableText,
    simplePortableText,
    skill,
    work,
    // The following are document types which will appear
    // in the studio.
    aboutMe,
    archive,
    category,
    contact,
    introPage,
    person,
    projectOverview,
    sampleProject,
    siteSettings,
    tag
  ])
})
