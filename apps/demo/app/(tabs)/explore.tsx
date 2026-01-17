import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react'
import { colors } from '@xaui/colors'
import { Select, SelectItem } from '@xaui/select'

export default function ExploreScreen() {
  const [singleSelectKeys, setSingleSelectKeys] = useState(['fr'])
  const [multiSelectKeys, setMultiSelectKeys] = useState(['design', 'mobile'])
  const [variantOutlinedKeys, setVariantOutlinedKeys] = useState(['option2'])
  const [variantFlatKeys, setVariantFlatKeys] = useState(['option1'])
  const [variantLightKeys, setVariantLightKeys] = useState(['option3'])
  const [variantFadedKeys, setVariantFadedKeys] = useState(['option1'])
  const [variantUnderlinedKeys, setVariantUnderlinedKeys] = useState(['option2'])
  const [colorDefaultKeys, setColorDefaultKeys] = useState(['item1'])
  const [colorPrimaryKeys, setColorPrimaryKeys] = useState(['item2'])
  const [colorSecondaryKeys, setColorSecondaryKeys] = useState(['item1'])
  const [colorSuccessKeys, setColorSuccessKeys] = useState(['item3'])
  const [colorWarningKeys, setColorWarningKeys] = useState(['item2'])
  const [colorDangerKeys, setColorDangerKeys] = useState(['item1'])
  const [sizeSmallKeys, setSizeSmallKeys] = useState(['small1'])
  const [sizeMediumKeys, setSizeMediumKeys] = useState(['medium2'])
  const [sizeLargeKeys, setSizeLargeKeys] = useState(['large1'])
  const [radiusNoneKeys, setRadiusNoneKeys] = useState(['r1'])
  const [radiusSmKeys, setRadiusSmKeys] = useState(['r2'])
  const [radiusMdKeys, setRadiusMdKeys] = useState(['r1'])
  const [radiusLgKeys, setRadiusLgKeys] = useState(['r3'])
  const [radiusFullKeys, setRadiusFullKeys] = useState(['r2'])
  const [labelOutsideKeys, setLabelOutsideKeys] = useState(['lo1'])
  const [labelInsideKeys, setLabelInsideKeys] = useState(['li2'])
  const [labelOutsideLeftKeys, setLabelOutsideLeftKeys] = useState(['lol1'])

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Components</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Single Select</Text>
        <Select
          label="Country"
          placeholder="Pick a country"
          selectionMode="single"
          selectedKeys={singleSelectKeys}
          onSelectionChange={setSingleSelectKeys}
          hint="Choose your primary location"
          variant="outlined"
          size="md"
          radius="md"
        >
          <SelectItem key="fr" title="France" description="Paris" />
          <SelectItem key="es" title="Spain" description="Madrid" />
          <SelectItem key="jp" title="Japan" description="Tokyo" />
          <SelectItem key="us" title="United States" description="Washington, D.C." />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Multiple Select</Text>
        <Select
          label="Interests"
          placeholder="Pick interests"
          selectionMode="multiple"
          selectedKeys={multiSelectKeys}
          onSelectionChange={setMultiSelectKeys}
          hint="Select multiple options"
          variant="faded"
          size="md"
          radius="lg"
        >
          <SelectItem key="design" title="Design" />
          <SelectItem key="mobile" title="Mobile" />
          <SelectItem key="web" title="Web" />
          <SelectItem key="ai" title="AI" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Variants</Text>
        <Select
          label="Outlined Variant"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={variantOutlinedKeys}
          onSelectionChange={setVariantOutlinedKeys}
          variant="outlined"
          themeColor="primary"
          size="md"
          radius="md"
        >
          <SelectItem key="option1" title="Option 1" />
          <SelectItem key="option2" title="Option 2" />
          <SelectItem key="option3" title="Option 3" />
        </Select>
        <Select
          label="Flat Variant"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={variantFlatKeys}
          onSelectionChange={setVariantFlatKeys}
          variant="flat"
          size="md"
          radius="md"
        >
          <SelectItem key="option1" title="Option 1" />
          <SelectItem key="option2" title="Option 2" />
          <SelectItem key="option3" title="Option 3" />
        </Select>
        <Select
          label="Light Variant"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={variantLightKeys}
          onSelectionChange={setVariantLightKeys}
          variant="light"
          size="md"
          radius="md"
        >
          <SelectItem key="option1" title="Option 1" />
          <SelectItem key="option2" title="Option 2" />
          <SelectItem key="option3" title="Option 3" />
        </Select>
        <Select
          label="Faded Variant"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={variantFadedKeys}
          onSelectionChange={setVariantFadedKeys}
          variant="faded"
          size="md"
          radius="md"
        >
          <SelectItem key="option1" title="Option 1" />
          <SelectItem key="option2" title="Option 2" />
          <SelectItem key="option3" title="Option 3" />
        </Select>
        <Select
          label="Underlined Variant"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={variantUnderlinedKeys}
          onSelectionChange={setVariantUnderlinedKeys}
          variant="underlined"
          size="md"
          radius="md"
        >
          <SelectItem key="option1" title="Option 1" />
          <SelectItem key="option2" title="Option 2" />
          <SelectItem key="option3" title="Option 3" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Colors</Text>
        <Select
          label="Default (Gray)"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={colorDefaultKeys}
          onSelectionChange={setColorDefaultKeys}
          variant="outlined"
          themeColor="default"
          size="md"
          radius="md"
        >
          <SelectItem key="item1" title="Item 1" />
          <SelectItem key="item2" title="Item 2" />
          <SelectItem key="item3" title="Item 3" />
        </Select>
        <Select
          label="Primary"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={colorPrimaryKeys}
          onSelectionChange={setColorPrimaryKeys}
          variant="outlined"
          themeColor="primary"
          size="md"
          radius="md"
        >
          <SelectItem key="item1" title="Item 1" />
          <SelectItem key="item2" title="Item 2" />
          <SelectItem key="item3" title="Item 3" />
        </Select>
        <Select
          label="Secondary"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={colorSecondaryKeys}
          onSelectionChange={setColorSecondaryKeys}
          variant="outlined"
          themeColor="secondary"
          size="md"
          radius="md"
        >
          <SelectItem key="item1" title="Item 1" />
          <SelectItem key="item2" title="Item 2" />
          <SelectItem key="item3" title="Item 3" />
        </Select>
        <Select
          label="Success"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={colorSuccessKeys}
          onSelectionChange={setColorSuccessKeys}
          variant="outlined"
          themeColor="success"
          size="md"
          radius="md"
        >
          <SelectItem key="item1" title="Item 1" />
          <SelectItem key="item2" title="Item 2" />
          <SelectItem key="item3" title="Item 3" />
        </Select>
        <Select
          label="Warning"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={colorWarningKeys}
          onSelectionChange={setColorWarningKeys}
          variant="outlined"
          themeColor="warning"
          size="md"
          radius="md"
        >
          <SelectItem key="item1" title="Item 1" />
          <SelectItem key="item2" title="Item 2" />
          <SelectItem key="item3" title="Item 3" />
        </Select>
        <Select
          label="Danger"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={colorDangerKeys}
          onSelectionChange={setColorDangerKeys}
          variant="outlined"
          themeColor="danger"
          size="md"
          radius="md"
        >
          <SelectItem key="item1" title="Item 1" />
          <SelectItem key="item2" title="Item 2" />
          <SelectItem key="item3" title="Item 3" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sizes</Text>
        <Select
          label="Small"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={sizeSmallKeys}
          onSelectionChange={setSizeSmallKeys}
          variant="outlined"
          size="sm"
          radius="md"
        >
          <SelectItem key="small1" title="Small Option 1" />
          <SelectItem key="small2" title="Small Option 2" />
        </Select>
        <Select
          label="Medium"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={sizeMediumKeys}
          onSelectionChange={setSizeMediumKeys}
          variant="outlined"
          size="md"
          radius="md"
        >
          <SelectItem key="medium1" title="Medium Option 1" />
          <SelectItem key="medium2" title="Medium Option 2" />
        </Select>
        <Select
          label="Large"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={sizeLargeKeys}
          onSelectionChange={setSizeLargeKeys}
          variant="outlined"
          size="lg"
          radius="md"
        >
          <SelectItem key="large1" title="Large Option 1" />
          <SelectItem key="large2" title="Large Option 2" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Radius</Text>
        <Select
          label="None"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={radiusNoneKeys}
          onSelectionChange={setRadiusNoneKeys}
          variant="outlined"
          size="md"
          radius="none"
        >
          <SelectItem key="r1" title="Radius None" />
          <SelectItem key="r2" title="Option 2" />
        </Select>
        <Select
          label="Small"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={radiusSmKeys}
          onSelectionChange={setRadiusSmKeys}
          variant="outlined"
          size="md"
          radius="sm"
        >
          <SelectItem key="r1" title="Radius Small" />
          <SelectItem key="r2" title="Option 2" />
        </Select>
        <Select
          label="Medium"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={radiusMdKeys}
          onSelectionChange={setRadiusMdKeys}
          variant="outlined"
          size="md"
          radius="md"
        >
          <SelectItem key="r1" title="Radius Medium" />
          <SelectItem key="r2" title="Option 2" />
        </Select>
        <Select
          label="Large"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={radiusLgKeys}
          onSelectionChange={setRadiusLgKeys}
          variant="outlined"
          size="md"
          radius="lg"
        >
          <SelectItem key="r1" title="Radius Large" />
          <SelectItem key="r2" title="Option 2" />
          <SelectItem key="r3" title="Option 3" />
        </Select>
        <Select
          label="Full"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={radiusFullKeys}
          onSelectionChange={setRadiusFullKeys}
          variant="outlined"
          size="md"
          radius="full"
        >
          <SelectItem key="r1" title="Radius Full" />
          <SelectItem key="r2" title="Option 2" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Label Placements</Text>
        <Select
          label="Outside Label"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={labelOutsideKeys}
          onSelectionChange={setLabelOutsideKeys}
          variant="outlined"
          labelPlacement="outside"
          size="md"
          radius="md"
        >
          <SelectItem key="lo1" title="Option 1" />
          <SelectItem key="lo2" title="Option 2" />
        </Select>
        <Select
          label="Inside Label"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={labelInsideKeys}
          onSelectionChange={setLabelInsideKeys}
          variant="outlined"
          labelPlacement="inside"
          size="md"
          radius="md"
        >
          <SelectItem key="li1" title="Option 1" />
          <SelectItem key="li2" title="Option 2" />
        </Select>
        <Select
          label="Outside Left"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={labelOutsideLeftKeys}
          onSelectionChange={setLabelOutsideLeftKeys}
          variant="outlined"
          labelPlacement="outside-left"
          size="md"
          radius="md"
        >
          <SelectItem key="lol1" title="Option 1" />
          <SelectItem key="lol2" title="Option 2" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>States</Text>
        <Select
          label="Disabled"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={[]}
          onSelectionChange={() => {}}
          variant="outlined"
          size="md"
          radius="md"
          isDisabled
        >
          <SelectItem key="d1" title="Option 1" />
          <SelectItem key="d2" title="Option 2" />
        </Select>
        <Select
          label="Invalid"
          placeholder="Select option"
          selectionMode="single"
          selectedKeys={[]}
          onSelectionChange={() => {}}
          variant="outlined"
          size="md"
          radius="md"
          isInvalid
          errorMessage="This field is required"
        >
          <SelectItem key="i1" title="Option 1" />
          <SelectItem key="i2" title="Option 2" />
        </Select>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.slate[950],
  },
  container: {
    padding: 20,
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
})
