import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

type Option = {
  label: string;
  value: string;
};

export default function BottleFormScreen() {
  const insets = useSafeAreaInsets();

  const [produtor, setProdutor] = useState('');
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');

  const [tipoUva, setTipoUva] = useState<Option | null>(null);
  const [tipoVinho, setTipoVinho] = useState<Option | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [onSelect, setOnSelect] = useState<(opt: Option) => void>(() => {});

  // opções
  const uvas: Option[] = [
    { label: 'Cabernet Sauvignon', value: 'cabernet' },
    { label: 'Merlot', value: 'merlot' },
    { label: 'Pinot Noir', value: 'pinot' },
    { label: 'Chardonnay', value: 'chardonnay' },
    { label: 'Sauvignon Blanc', value: 'sauvignon' },
  ];

  const tipos: Option[] = [
    { label: 'Tinto', value: 'tinto' },
    { label: 'Branco', value: 'branco' },
    { label: 'Rosé', value: 'rose' },
    { label: 'Espumante', value: 'espumante' },
    { label: 'Sobremesa', value: 'sobremesa' },
  ];

  function openSelect(options: Option[], callback: (opt: Option) => void) {
    setCurrentOptions(options);
    setOnSelect(() => callback);
    setModalVisible(true);
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#fff' }}>
      
      {/* HEADER */}
      <Box className="px-4 py-3 border-b border-gray-100">
        <Heading size="xl">Nova Garrafa</Heading>
      </Box>

      {/* FORM */}
      <Box className="p-4 gap-4">

        {/* PRODUTOR */}
        <Box>
          <Text className="text-gray-500 mb-1">Produtor</Text>
          <TextInput
            value={produtor}
            onChangeText={setProdutor}
            placeholder="Ex: Château Margaux"
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              padding: 12
            }}
          />
        </Box>

        {/* NOME DO VINHO */}
        <Box>
          <Text className="text-gray-500 mb-1">Nome do vinho</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: Grand Vin 2015"
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              padding: 12
            }}
          />
        </Box>

        {/* LOCAL */}
        <Box>
          <Text className="text-gray-500 mb-1">Região / País</Text>
          <TextInput
            value={local}
            onChangeText={setLocal}
            placeholder="Ex: Bordeaux, França"
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              padding: 12
            }}
          />
        </Box>

        {/* TIPO DE UVA */}
        <Box>
          <Text className="text-gray-500 mb-1">Tipo de uva</Text>
          <TouchableOpacity
            onPress={() => openSelect(uvas, setTipoUva)}
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              padding: 12
            }}
          >
            <Text>
              {tipoUva ? tipoUva.label : 'Selecionar uva'}
            </Text>
          </TouchableOpacity>
        </Box>

        {/* TIPO DE VINHO */}
        <Box>
          <Text className="text-gray-500 mb-1">Tipo de vinho</Text>
          <TouchableOpacity
            onPress={() => openSelect(tipos, setTipoVinho)}
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              padding: 12
            }}
          >
            <Text>
              {tipoVinho ? tipoVinho.label : 'Selecionar tipo'}
            </Text>
          </TouchableOpacity>
        </Box>

      </Box>

      {/* MODAL SELECT */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '50%'
          }}>
            <FlatList
              data={currentOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                  style={{ paddingVertical: 12 }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

    </View>
  );
}