CREATE TABLE `veep-production.ce_data.mart_eyeball_vehicle_hourly`
as
(select
PARTITION_DATE,
city_id,
hour,
COUNT(DISTINCT CASE WHEN vehicle_type in (2,3,6,8,9) THEN eyeball_id END) AS eyeball_vhc_2_3_6_8_9,
COUNT(DISTINCT CASE WHEN vehicle_type in (3) THEN eyeball_id END) AS eyeball_vhc_3,
COUNT(DISTINCT CASE WHEN vehicle_type in (3,6) THEN eyeball_id END) AS eyeball_vhc_3_6,
COUNT(DISTINCT CASE WHEN vehicle_type in (3,6,23,24,38) THEN eyeball_id END) AS eyeball_vhc_3_6_23_24_38,
COUNT(DISTINCT CASE WHEN vehicle_type in (3,6,9,23,24,38) THEN eyeball_id END) AS eyeball_vhc_3_6_9_23_24_38,
COUNT(DISTINCT CASE WHEN vehicle_type in (8) THEN eyeball_id END) AS eyeball_vhc_8,
COUNT(DISTINCT CASE WHEN vehicle_type in (9) THEN eyeball_id END) AS eyeball_vhc_9,

COUNT(DISTINCT CASE WHEN vehicle_type in (3) AND surge_factor > 1 THEN eyeball_id END) AS eyeball_surged_vhc_3,
COUNT(DISTINCT CASE WHEN vehicle_type in (3,6) AND surge_factor > 1 THEN eyeball_id END) AS eyeball_surged_vhc_3_6,
COUNT(DISTINCT CASE WHEN vehicle_type in (8) AND surge_factor > 1 THEN eyeball_id END) AS eyeball_surged_vhc_8,
COUNT(DISTINCT CASE WHEN vehicle_type in (3) AND surge_factor > 1 THEN eyeball_id END) AS eyeball_surged_vhc_9,

AVG(CASE WHEN vehicle_type in (3) THEN surge_factor END) AS surge_eyeball_ASM_vhc_3,
AVG(CASE WHEN vehicle_type in (3,6) THEN surge_factor END) AS surge_eyeball_ASM_vhc_3_6,
AVG(CASE WHEN vehicle_type in (8) THEN surge_factor END) AS surge_eyeball_ASM_vhc_8,
AVG(CASE WHEN vehicle_type in (9) THEN surge_factor END) AS surge_eyeball_ASM_vhc_9,

AVG(CASE WHEN vehicle_type in (3) AND surge_factor > 1 THEN surge_factor END) AS surge_eyeball_factor_vhc_3,
AVG(CASE WHEN vehicle_type in (3,6) AND surge_factor > 1 THEN surge_factor END) AS surge_eyeball_factor_vhc_3_6,
AVG(CASE WHEN vehicle_type in (8) AND surge_factor > 1 THEN surge_factor END) AS surge_eyeball_factor_vhc_8,
AVG(CASE WHEN vehicle_type in (9) AND surge_factor > 1 THEN surge_factor END) AS surge_eyeball_factor_vhc_9,

COUNT(DISTINCT CASE WHEN vehicle_type in (3) THEN rider_id END) AS rider_eyeball_vhc_3,
COUNT(DISTINCT CASE WHEN vehicle_type in (3,6) THEN rider_id END) AS rider_eyeball_vhc_3_6,
COUNT(DISTINCT CASE WHEN vehicle_type in (3,6,23,24,38) THEN rider_id END) AS rider_eyeball_vhc_3_6_23_24_38,
COUNT(DISTINCT CASE WHEN vehicle_type in (8) THEN rider_id END) AS rider_eyeball_vhc_8,
COUNT(DISTINCT CASE WHEN vehicle_type in (9) THEN rider_id END) AS rider_eyeball_vhc_9,

from `veep-production.ce_data.eyeball_raw_info`
where partition_date between current_date("+7") - 8 and current_date("+7") - 1
group by 1,2,3)