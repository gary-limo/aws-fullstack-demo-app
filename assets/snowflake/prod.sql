-- Create Development Database in Snowflake
-- The following script will create the 'dev' database and create table structures for the Insurance Management System project.

-- Create Development Database
create database prod;
use database prod;

-- Create Schemas for Development Database
create schema target_schema;
create schema load_schema;
create schema view_schema;


-- Create Tables for Development Database in target_schema
use schema target_schema;

create or replace table incident (
    incident_id varchar(20),
    incident_type varchar(30),
    incident_date date,
    description varchar(100)
);

create or replace table customer (
    cust_id varchar(20),
    cust_fname varchar(10),
    cust_lname varchar(10),
    cust_dob date,
    cust_gender char(2),
    cust_address varchar(20),
    cust_mob_number integer,
    cust_email varchar(20),
    cust_passport_number varchar(20),
    cust_marital_status char(8)
);

create or replace table incident_report (
    incident_report_id varchar(20),
    incident_type char(10),
    incident_inspector varchar(20),
    incident_cost integer,
    incident_report_description varchar(100),
    incident_id varchar(20),
    cust_id varchar(20)
);

create or replace table insurance_company (
    company_name varchar(20),
    company_address varchar(20),
    company_contact_number integer,
    company_fax integer,
    company_email varchar(20),
    company_website varchar(20),
    company_location varchar(20),
    company_department_name varchar(20),
    company_office_name varchar(20)
);

create or replace table department (
    department_name varchar(20),
    department_id char(18),
    department_staff char(18),
    department_offices char(18),
    company_name varchar(20)
);

create or replace table vehicle_service (
    department_name varchar(20),
    vehicle_service_company_name varchar(20),
    vehicle_service_address varchar(20),
    vehicle_service_contact varchar(20),
    vehicle_service_incharge varchar(20),
    vehicle_service_type varchar(20),
    department_id varchar(20),
    company_name varchar(20)
);

create or replace table vehicle (
    vehicle_id varchar(20),
    policy_id varchar(20),
    dependent_nok_id varchar(20),
    vehicle_registration_number varchar(20),
    vehicle_value integer,
    vehicle_type varchar(20),
    vehicle_size integer,
    vehicle_number_of_seat integer,
    vehicle_manufacturer varchar(20),
    vehicle_engine_number integer,
    vehicle_chasis_number integer,
    vehicle_number varchar(20),
    vehicle_model_number varchar(20),
    cust_id varchar(20)
);

create or replace table premium_payment (
    premium_payment_id varchar(20),
    policy_number varchar(20),
    premium_payment_amount integer,
    premium_payment_schedule date,
    receipt_id varchar(20),
    cust_id varchar(20)
);

create or replace table receipt (
    receipt_id varchar(20),
    time date,
    cost integer,
    premium_payment_id varchar(20),
    cust_id varchar(20)
);

create or replace table application (
    application_id varchar(20),
    vehicle_id varchar(20),
    application_status char(8),
    coverage varchar(50),
    cust_id varchar(20)
);

create or replace table insurance_policy (
    agreement_id varchar(20),
    department_name varchar(20),
    policy_number varchar(20),
    start_date date,
    expiry_date date,
    term_condition_description varchar(100),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table policy_renewable (
    policy_renewable_id varchar(20),
    date_of_renewal date,
    type_of_renewal char(15),
    agreement_id varchar(20),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table membership (
    membership_id varchar(20),
    membership_type char(15),
    organisation_contact varchar(20),
    cust_id varchar(20)
);

create or replace table quote (
    quote_id varchar(20),
    issue_date date,
    valid_from_date date,
    valid_till_date date,
    description varchar(100),
    product_id varchar(20),
    coverage_level varchar(20),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table staff (
    staff_id varchar(20),
    staff_fname varchar(10),
    staff_lname varchar(10),
    staff_adress varchar(20),
    staff_contact integer,
    staff_gender char(2),
    staff_marital_status char(8),
    staff_nationality char(15),
    staff_qualification varchar(20),
    staff_allowance integer,
    staff_pps_number integer,
    company_name varchar(20)
);

create or replace table nok (
    nok_id varchar(20),
    nok_name varchar(20),
    nok_address varchar(20),
    nok_phone_number integer,
    nok_gender char(2),
    nok_marital_status char(8),
    agreement_id varchar(20),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table product (
    product_price integer,
    product_type char(15),
    product_number varchar(20),
    company_name varchar(20)
);

create or replace table coverage (
    coverage_id varchar(20),
    coverage_amount integer,
    coverage_type char(10),
    coverage_level char(15),
    product_id varchar(20),
    coverage_description varchar(100),
    covearge_terms varchar(50),
    company_name varchar(20)
);

create or replace table insurance_policy_coverage (
    agreement_id varchar(20),
    application_id varchar(20),
    cust_id varchar(20),
    coverage_id varchar(20),
    company_name varchar(20)
);

create or replace table claim (
    claim_id varchar(20),
    agreement_id varchar(20),
    claim_amount integer,
    incident_id varchar(20),
    damage_type varchar(20),
    date_of_claim date,
    claim_status char(10),
    cust_id varchar(20)
);

create or replace table claim_settlement (
    claim_settlement_id varchar(20),
    vehicle_id varchar(20),
    date_settled date,
    amount_paid integer,
    coverage_id varchar(20),
    claim_id varchar(20),
    cust_id varchar(20)
);


-- Create Tables for Development Database in load_schema
use schema load_schema;
create or replace table incident (
    incident_id varchar(20),
    incident_type varchar(30),
    incident_date date,
    description varchar(100)
);

create or replace table customer (
    cust_id varchar(20),
    cust_fname varchar(10),
    cust_lname varchar(10),
    cust_dob date,
    cust_gender char(2),
    cust_address varchar(20),
    cust_mob_number integer,
    cust_email varchar(20),
    cust_passport_number varchar(20),
    cust_marital_status char(8)
);

create or replace table incident_report (
    incident_report_id varchar(20),
    incident_type char(10),
    incident_inspector varchar(20),
    incident_cost integer,
    incident_report_description varchar(100),
    incident_id varchar(20),
    cust_id varchar(20)
);

create or replace table insurance_company (
    company_name varchar(20),
    company_address varchar(20),
    company_contact_number integer,
    company_fax integer,
    company_email varchar(20),
    company_website varchar(20),
    company_location varchar(20),
    company_department_name varchar(20),
    company_office_name varchar(20)
);

create or replace table department (
    department_name varchar(20),
    department_id char(18),
    department_staff char(18),
    department_offices char(18),
    company_name varchar(20)
);

create or replace table vehicle_service (
    department_name varchar(20),
    vehicle_service_company_name varchar(20),
    vehicle_service_address varchar(20),
    vehicle_service_contact varchar(20),
    vehicle_service_incharge varchar(20),
    vehicle_service_type varchar(20),
    department_id varchar(20),
    company_name varchar(20)
);

create or replace table vehicle (
    vehicle_id varchar(20),
    policy_id varchar(20),
    dependent_nok_id varchar(20),
    vehicle_registration_number varchar(20),
    vehicle_value integer,
    vehicle_type varchar(20),
    vehicle_size integer,
    vehicle_number_of_seat integer,
    vehicle_manufacturer varchar(20),
    vehicle_engine_number integer,
    vehicle_chasis_number integer,
    vehicle_number varchar(20),
    vehicle_model_number varchar(20),
    cust_id varchar(20)
);

create or replace table premium_payment (
    premium_payment_id varchar(20),
    policy_number varchar(20),
    premium_payment_amount integer,
    premium_payment_schedule date,
    receipt_id varchar(20),
    cust_id varchar(20)
);

create or replace table receipt (
    receipt_id varchar(20),
    time date,
    cost integer,
    premium_payment_id varchar(20),
    cust_id varchar(20)
);

create or replace table application (
    application_id varchar(20),
    vehicle_id varchar(20),
    application_status char(8),
    coverage varchar(50),
    cust_id varchar(20)
);

create or replace table insurance_policy (
    agreement_id varchar(20),
    department_name varchar(20),
    policy_number varchar(20),
    start_date date,
    expiry_date date,
    term_condition_description varchar(100),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table policy_renewable (
    policy_renewable_id varchar(20),
    date_of_renewal date,
    type_of_renewal char(15),
    agreement_id varchar(20),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table membership (
    membership_id varchar(20),
    membership_type char(15),
    organisation_contact varchar(20),
    cust_id varchar(20)
);

create or replace table quote (
    quote_id varchar(20),
    issue_date date,
    valid_from_date date,
    valid_till_date date,
    description varchar(100),
    product_id varchar(20),
    coverage_level varchar(20),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table staff (
    staff_id varchar(20),
    staff_fname varchar(10),
    staff_lname varchar(10),
    staff_adress varchar(20),
    staff_contact integer,
    staff_gender char(2),
    staff_marital_status char(8),
    staff_nationality char(15),
    staff_qualification varchar(20),
    staff_allowance integer,
    staff_pps_number integer,
    company_name varchar(20)
);

create or replace table nok (
    nok_id varchar(20),
    nok_name varchar(20),
    nok_address varchar(20),
    nok_phone_number integer,
    nok_gender char(2),
    nok_marital_status char(8),
    agreement_id varchar(20),
    application_id varchar(20),
    cust_id varchar(20)
);

create or replace table product (
    product_price integer,
    product_type char(15),
    product_number varchar(20),
    company_name varchar(20)
);

create or replace table coverage (
    coverage_id varchar(20),
    coverage_amount integer,
    coverage_type char(10),
    coverage_level char(15),
    product_id varchar(20),
    coverage_description varchar(100),
    covearge_terms varchar(50),
    company_name varchar(20)
);

create or replace table insurance_policy_coverage (
    agreement_id varchar(20),
    application_id varchar(20),
    cust_id varchar(20),
    coverage_id varchar(20),
    company_name varchar(20)
);

create or replace table claim (
    claim_id varchar(20),
    agreement_id varchar(20),
    claim_amount integer,
    incident_id varchar(20),
    damage_type varchar(20),
    date_of_claim date,
    claim_status char(10),
    cust_id varchar(20)
);

create or replace table claim_settlement (
    claim_settlement_id varchar(20),
    vehicle_id varchar(20),
    date_settled date,
    amount_paid integer,
    coverage_id varchar(20),
    claim_id varchar(20),
    cust_id varchar(20)
);


-- View Refresh in view_schema
use schema view_schema;
 

create or replace view view_incident as select * from target_schema.incident;
create or replace view view_customer as select * from target_schema.customer;
create or replace view view_incident_report as select * from target_schema.incident_report;
create or replace view view_insurance_company as select * from target_schema.insurance_company;
create or replace view view_department as select * from target_schema.department;
create or replace view view_vehicle_service as select * from target_schema.vehicle_service;
create or replace view view_vehicle as select * from target_schema.vehicle;
create or replace view view_premium_payment as select * from target_schema.premium_payment;
create or replace view view_receipt as select * from target_schema.receipt;
create or replace view view_application as select * from target_schema.application;
create or replace view view_insurance_policy as select * from target_schema.insurance_policy;
create or replace view view_policy_renewable as select * from target_schema.policy_renewable;
create or replace view view_membership as select * from target_schema.membership;
create or replace view view_quote as select * from target_schema.quote;
create or replace view view_staff as select * from target_schema.staff;
create or replace view view_nok as select * from target_schema.nok;
create or replace view view_product as select * from target_schema.product;
create or replace view view_coverage as select * from target_schema.coverage;
create or replace view view_insurance_policy_coverage as select * from target_schema.insurance_policy_coverage;
create or replace view view_claim as select * from target_schema.claim;
create or replace view view_claim_settlement as select * from target_schema.claim_settlement;